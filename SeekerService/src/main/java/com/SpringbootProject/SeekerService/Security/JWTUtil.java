package com.SpringbootProject.SeekerService.Security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import java.util.Date;
import java.util.List;


    @Component
    public class JWTUtil {

        @Value("${jwt.secret}")
        private String jwtSecret;

        // Extract username/email from token
        public String extractUsername(String token) {
            return extractAllClaims(token).getSubject();
        }

        // Extract roles from token
        public List<String> extractRoles(String token) {
            Claims claims = extractAllClaims(token);
            Object rolesObject = claims.get("role");
            if (rolesObject instanceof List) {
                return ((List<?>) rolesObject).stream()
                        .map(Object::toString)
                        .toList();
            }
            return List.of();
        }

        // Check if token expired
        private boolean isTokenExpired(String token) {
            return extractAllClaims(token).getExpiration().before(new Date());
        }

        // Validate token (signature + expiry)
        public boolean validateToken(String token) {
            try {
                return !isTokenExpired(token);
            } catch (Exception e) {
                return false;
            }
        }

        private Claims extractAllClaims(String token) {
            return Jwts.parser()
                    .setSigningKey(jwtSecret)
                    .parseClaimsJws(token)
                    .getBody();
        }
    }


