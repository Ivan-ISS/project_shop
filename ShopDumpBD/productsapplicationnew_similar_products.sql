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
-- Table structure for table `similar_products`
--

DROP TABLE IF EXISTS `similar_products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `similar_products` (
  `id` varchar(36) NOT NULL,
  `first_product` varchar(36) NOT NULL,
  `second_product` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `first_product` (`first_product`),
  KEY `second_product` (`second_product`),
  CONSTRAINT `similar_products_ibfk_1` FOREIGN KEY (`first_product`) REFERENCES `products` (`product_id`),
  CONSTRAINT `similar_products_ibfk_2` FOREIGN KEY (`second_product`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `similar_products`
--

LOCK TABLES `similar_products` WRITE;
/*!40000 ALTER TABLE `similar_products` DISABLE KEYS */;
INSERT INTO `similar_products` VALUES ('1a0a8506-0a4b-4246-a391-81eba9567f10','51c411ef-8d41-49c0-b65e-dd65eabacfcd','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06'),('23aa5d66-6142-4814-b29e-620928d99107','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c'),('384506bc-e5ab-45f4-b5f6-92d68867c2b0','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28'),('49194d10-926d-4ece-a87d-fc462c5eff3d','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','4f4b4f16-77cb-4c24-bcae-238cde406fb3'),('5fa165d3-9810-4a68-9deb-65d845b152ec','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','34f7a373-bfaf-4804-83c5-90bdd106e033'),('7a96dcbc-6317-460e-a1a3-f525bda5b9dd','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('7eb1345e-1f20-442e-a786-49f245da13f8','34e1a2a7-d0a9-4c7a-99f6-c2d5b5afaa06','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c'),('852567d1-ec95-497c-bdaa-19dbbd9a1e84','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','e144947e-3af7-4d3c-8327-ecf39255617d'),('930b30be-7250-4487-99a0-53dc51ac1058','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('ab72597e-b284-457d-97aa-bc617864bf71','51c411ef-8d41-49c0-b65e-dd65eabacfcd','4f4b4f16-77cb-4c24-bcae-238cde406fb3'),('b23dc385-fbf3-4f09-816c-eb67dde5a230','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58'),('ed36b7f8-f2b4-4c3d-b184-3bbfb79cab47','51c411ef-8d41-49c0-b65e-dd65eabacfcd','34f7a373-bfaf-4804-83c5-90bdd106e033'),('f30b5116-1426-4161-bb25-b62aefa664cd','51c411ef-8d41-49c0-b65e-dd65eabacfcd','e144947e-3af7-4d3c-8327-ecf39255617d');
/*!40000 ALTER TABLE `similar_products` ENABLE KEYS */;
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
