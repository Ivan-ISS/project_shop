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
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `image_id` varchar(36) NOT NULL,
  `url` text NOT NULL,
  `product_id` varchar(36) NOT NULL,
  `main` tinyint(1) NOT NULL,
  PRIMARY KEY (`image_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES ('10ea8d35-48de-484c-8f1a-44819fdce84a','https://via.placeholder.com/150/5e04a4','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('19b750d4-8593-4cea-a5a7-af1609d47959','https://via.placeholder.com/150/d32776','51c411ef-8d41-49c0-b65e-dd65eabacfcd',1),('1e2edfe5-512d-4a9c-b95a-75d623e6f174',' https://via.placeholder.com/150/323599','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('2010c194-e446-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/9c184f','6f1a6b96-6cd2-439c-a648-88b9f287f7d2',1),('2010c73e-e446-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/1fe46f','6f1a6b96-6cd2-439c-a648-88b9f287f7d2',0),('2010c964-e446-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/56acb2','6f1a6b96-6cd2-439c-a648-88b9f287f7d2',0),('2010cc20-e446-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/8985dc','6f1a6b96-6cd2-439c-a648-88b9f287f7d2',0),('2e64e6b5-5fea-4d26-a37b-a6dab279ee9b','https://via.placeholder.com/150/9c184f','34f7a373-bfaf-4804-83c5-90bdd106e033',0),('536789a6-4586-4f0c-a776-74726a54833b','https://via.placeholder.com/150/f9cee5','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('56f5cc36-308f-4807-aa94-b4c740d26dd5','https://via.placeholder.com/150/cde4c1','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('6e945652-a207-4d2d-8448-2eeb3ad37ffc','https://via.placeholder.com/150/65ad4f','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('708886dc-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/f66b97','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58',1),('708889f2-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/56a8c2','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58',0),('70888b46-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/b0f7cc','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58',0),('70888c90-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/54176f','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58',0),('9a22e48f-625e-4804-a96c-c2f7c608ccc8','https://via.placeholder.com/150/54176f','34f7a373-bfaf-4804-83c5-90bdd106e033',1),('9f8af6bd-88e7-4fcf-a139-ef3a4dc57d5d','https://via.placeholder.com/150/9c184f','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('a0f2a9a6-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/51aa97','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c',1),('a0f2ae9c-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/810b14','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c',0),('a0f2afd2-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/1ee8a4','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c',0),('a0f2b0fe-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/66b7d2','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c',0),('ae5dc6d6-97a4-4554-b7c0-a935c752ba94','https://via.placeholder.com/150/aa8f2e','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('b8ecee0d-8e16-4c6e-a684-16dcfec9b1c5','https://via.placeholder.com/150/e403d1','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('c65bb9f8-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/197d29','efd82d85-8dd6-4979-bf5c-96933d9c2f7d',1),('c65bc984-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/61a65','efd82d85-8dd6-4979-bf5c-96933d9c2f7d',0),('c65bd136-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/f9cee5','efd82d85-8dd6-4979-bf5c-96933d9c2f7d',0),('c65bd316-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/fdf73e','efd82d85-8dd6-4979-bf5c-96933d9c2f7d',0),('ca84686e-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/92c952','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c',1),('ca846b8e-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/771796','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c',0),('ca846df0-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/24f355','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c',0),('ca846fb2-e45b-11ed-b5ea-0242ac120002','https://via.placeholder.com/150/d32776','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c',0),('cbfc19c6-0ba9-4a81-9ad1-83f22509486f','https://via.placeholder.com/150/6efc5f','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('cf61cfe9-3642-4ef9-9b05-43c1569ad3d5','https://via.placeholder.com/150/a46a91','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0),('f0f89394-af61-4499-abce-513c8d2c8cc6','https://via.placeholder.com/150/56acb2','51c411ef-8d41-49c0-b65e-dd65eabacfcd',0);
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
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
