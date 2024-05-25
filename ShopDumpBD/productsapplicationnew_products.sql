-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: productsapplicationnew
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` varchar(36) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06','Galaxy A52','A mid-range smartphone with a large battery and display.',17999.25),('34f7a373-bfaf-4804-83c5-90bdd106e033','Samsung A50','total',1200.50),('36239a24-f71d-4f11-a93e-506775f882e9','Pixel 6','A high-end smartphone with cutting-edge technology.',56999.00),('4f4b4f16-77cb-4c24-bcae-238cde406fb3','Reno6','A stylish smartphone with advanced camera capabilities.',25999.50),('51c411ef-8d41-49c0-b65e-dd65eabacfcd','Samsung A51','Description',1700.55),('5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c','Nova 8i','A mid-range smartphone with a large display and great camera.',12000.99),('6f1a6b96-6cd2-439c-a648-88b9f287f7d2','Moto G60','A reliable and durable smartphone with a long-lasting battery.',15999.00),('88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','Phone X','A sleek and powerful smartphone with the latest features.',8499.99),('9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c','iPhone SE','A compact and affordable iPhone with great performance.',38999.50),('a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58','Galaxy Z Flip 3','A foldable smartphone with a unique design.',79999.00),('e144947e-3af7-4d3c-8327-ecf39255617d','Zenfone 8','A compact smartphone with premium features.',25999.75),('efd82d85-8dd6-4979-bf5c-96933d9c2f7d','Redmi Note 11','A budget-friendly smartphone with a powerful processor.',7999.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-25 15:14:20
