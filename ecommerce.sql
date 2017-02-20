-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 21, 2017 at 01:48 AM
-- Server version: 5.6.35
-- PHP Version: 5.6.30-1+deb.sury.org~trusty+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE IF NOT EXISTS `brands` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `description` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `description`, `timestamp`) VALUES
(1, 'super brand 1', 'super brand number one', '2017-02-17 16:02:26'),
(2, 'super brand 2', 'super brand number two', '2017-02-17 16:02:26'),
(4, 'super brand 4', 'super brand number four', '2017-02-18 17:07:00'),
(5, 'super brand 5', 'no brand products description', '2017-02-19 16:39:40');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `brand_id` int(11) DEFAULT NULL,
  `name` varchar(200) DEFAULT NULL,
  `description` text,
  `price` int(11) NOT NULL DEFAULT '0',
  `color` varchar(200) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT '1',
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `brand_id`, `name`, `description`, `price`, `color`, `stock`, `status`, `timestamp`) VALUES
(1, 1, 'product one ', 'product one description', 10, 'blue', 10, 1, '2017-02-17 16:03:37'),
(3, 1, 'product three', 'product three description', 30, 'red', 0, 0, '2017-02-17 16:05:30'),
(4, 2, 'product four', 'product four description', 5, 'green', 100, 1, '2017-02-17 16:05:30'),
(5, 2, 'test product', 'test description', 111, 'blue', 0, 0, '2017-02-18 17:59:44'),
(6, 2, 'product available one', 'product available one desc', 22, 'black', 111, 1, '2017-02-18 18:00:26'),
(7, 4, 'product available two', 'product available two desc', 22, 'yellow', 111, 1, '2017-02-19 06:40:05');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE IF NOT EXISTS `reviews` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL DEFAULT '0',
  `comment` text,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `rating`, `comment`, `timestamp`) VALUES
(1, 1, 1, 5, 'super good product one', '2017-02-17 16:06:34'),
(2, 1, 1, 10, 'great product', '2017-02-17 16:06:34'),
(3, 1, 4, 5, 'not bad', '2017-02-17 16:07:02'),
(4, 1, 1, 10, 'super good product 1', '2017-02-18 14:40:42'),
(5, 1, 1, 10, 'test review', '2017-02-18 14:41:02'),
(8, 5, 1, 8, 'xxxxxxxxxxxxx review', '2017-02-18 15:03:13'),
(9, 5, 6, 6, 'xxxxxxxxxxxxx review', '2017-02-18 15:03:42'),
(10, 1, 6, 9, 'xxxxxxxxxxxxx review', '2017-02-18 15:05:43'),
(13, 1, 7, 6, 'test review super good', '2017-02-18 15:09:06'),
(14, 1, 4, 1, 'bad test review', '2017-02-18 15:15:07'),
(15, 6, 7, 10, 'test review', '2017-02-18 15:37:24'),
(17, 6, 4, 5, 'super', '2017-02-18 18:30:08');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `email` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `bday` varchar(200) CHARACTER SET utf8 DEFAULT NULL,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf16 AUTO_INCREMENT=7 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `type`, `bday`, `timestamp`) VALUES
(1, 'john paul', 'jnpl.onte@gmail.com', 0, '1989-02-05', '2017-02-17 16:09:05'),
(2, 'merchant', 'merchant@ecommerce.com', 1, '1989-02-05', '2017-02-17 16:09:05'),
(5, 'user me', 'jnpl@gmail.com', 0, NULL, '2017-02-18 17:34:22'),
(6, 'jnpl', 'jnpl.x@gmail.com', 0, '2017-11-11', '2017-02-18 17:34:38');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
