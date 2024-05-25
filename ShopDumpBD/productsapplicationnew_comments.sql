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
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` varchar(36) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `body` varchar(255) NOT NULL,
  `product_id` varchar(36) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('0215ac8b-f6b0-4369-b639-17eceafb91f0','Comment from Ivan-ISS','example@mail.com','I\'am like to meet you. This shop is very nice','51c411ef-8d41-49c0-b65e-dd65eabacfcd'),('1dd81ac3-bd8e-4d9c-b7be-00a84e02ece7','Comment from Ivan-ISS','example@mail.com','I like it! It\'s cool phone','88a3f826-9c3d-4f7c-a56e-156d7c3f3b28'),('2b2a59ce-e751-11ed-a05b-0242ac120003','odio adipisci rerum aut animi','Nikita@garfield.biz','quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('2b2a64b4-e751-11ed-a05b-0242ac120003','alias odio sit','Lew@alysha.tv','non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('2b2a67de-e751-11ed-a05b-0242ac120003','vero eaque aliquid doloribus et culpa','Hayden@althea.biz','harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c'),('2b2a69a0-e751-11ed-a05b-0242ac120003','et fugit eligendi deleniti quidem qui sint nihil autem','Presley.Mueller@myrl.com','doloribus at sed quis culpa deserunt consectetur qui praesentium\naccusamus fugiat dicta\nvoluptatem rerum ut voluptate autem\nvoluptatem repellendus aspernatur dolorem in','9b4d4a1a-5224-4ad4-b4e3-053dcbfa0f3c'),('2b2a6b1c-e751-11ed-a05b-0242ac120003','repellat consequatur praesentium vel minus molestias voluptatum','Dallas@ole.me','maiores sed dolores similique labore et inventore et\nquasi temporibus esse sunt id et\neos voluptatem aliquam\naliquid ratione corporis molestiae mollitia quia et magnam dolor','e144947e-3af7-4d3c-8327-ecf39255617d'),('2b2a6cac-e751-11ed-a05b-0242ac120003','et omnis dolorem','Mallory_Kunze@marie.org','ut voluptatem corrupti velit\nad voluptatem maiores\net nisi velit vero accusamus maiores\nvoluptates quia aliquid ullam eaque','e144947e-3af7-4d3c-8327-ecf39255617d'),('2b2a6e14-e751-11ed-a05b-0242ac120003','provident id voluptas','Meghan_Littel@rene.us','sapiente assumenda molestiae atque\nadipisci laborum distinctio aperiam et ab ut omnis\net occaecati aspernatur odit sit rem expedita\nquas enim ipsam minus','e144947e-3af7-4d3c-8327-ecf39255617d'),('30cd3dc6-e375-4636-bf33-9f7711ece83c','Comment from Ivan-ISS','example@mail.com','Second nice comment. I like it','51c411ef-8d41-49c0-b65e-dd65eabacfcd'),('35f9475c-b2bb-4568-9871-f927e8b7769d','eaque et deleniti atque tenetur ut quo ut','Carmen_Keeling@caroline.name','voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis','51c411ef-8d41-49c0-b65e-dd65eabacfcd'),('3dbbb484-a507-4694-b4f8-bf68368258a7','quo vero reiciendis velit similique earum','Jayne_Kuhic@sydney.com','est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et','51c411ef-8d41-49c0-b65e-dd65eabacfcd'),('83707768-317c-4875-bd8b-633161a4afd8','First comment added by SQL via POST-request','abcde@mail.com','Very important body','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('960519ec-a0ae-45a0-8e99-6227e3c92be2','Comment from Ivan-ISS','example@mail.com','I\'am like it','6f1a6b96-6cd2-439c-a648-88b9f287f7d2'),('cd6a5a97-e869-43ae-9586-abe64f36c3b9','id labore ex et quam laborum','Eliseo@gardner.biz','laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium','51c411ef-8d41-49c0-b65e-dd65eabacfcd'),('dc698fee-e47b-11ed-b5ea-0242ac120002','id labore ex et quam laborum','Eliseo@gardner.biz','laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('dc699412-e47b-11ed-b5ea-0242ac120002','quo vero reiciendis velit similique earum','Jayne_Kuhic@sydney.com','est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et','5c5f94eb-7e38-45e1-b7c9-57dfb7a2b93c'),('dc69b7b2-e47b-11ed-b5ea-0242ac120002','eaque et deleniti atque tenetur ut quo ut','Carmen_Keeling@caroline.name','voluptate iusto quis nobis reprehenderit ipsum amet nulla\nquia quas dolores velit et non\naut quia necessitatibus\nnostrum quaerat nulla et accusamus nisi facilis','a3d0fa3b-8e2c-4d19-bf2a-950b8c998a58'),('f93a6f38-2733-4baa-b460-5ef59688d22d','Comment from Ivan-ISS','example@mail.com','Third comment. This is best comment','51c411ef-8d41-49c0-b65e-dd65eabacfcd');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-24 19:16:10
