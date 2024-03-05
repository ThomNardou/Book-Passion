-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : db:3306
-- Généré le : mar. 05 mars 2024 à 13:30
-- Version du serveur : 8.0.30
-- Version de PHP : 8.0

DROP DATABASE IF EXISTS db_books;

CREATE DATABASE db_books;

USE db_books;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db_books`
--

-- --------------------------------------------------------

--
-- Structure de la table `t_books`
--

CREATE TABLE `t_books` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `numberPages` int NOT NULL,
  `excerpt` varchar(255) NOT NULL,
  `summary` varchar(255) NOT NULL,
  `writer` varchar(255) NOT NULL,
  `editor` varchar(255) NOT NULL,
  `releaseYear` int NOT NULL,
  `avgRating` float NOT NULL,
  `coverImage` varchar(255) NOT NULL,
  `fk_user` int NOT NULL,
  `fk_category` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `t_books`
--

INSERT INTO `t_books` (`id`, `title`, `numberPages`, `excerpt`, `summary`, `writer`, `editor`, `releaseYear`, `avgRating`, `coverImage`, `fk_user`, `fk_category`, `createdAt`, `updatedAt`) VALUES
(1, 'exempleUpdate', 100, 'rhrhrebsnbwertnsrtb', 'aebsrbhsrnrnbetn', 'bsrnbsbw', 'srergsrhe', 2500, 2.1, 'fgnrtjftndnrtenftmn', 1, 1, '2024-03-05 11:50:37', '2024-03-05 12:45:37'),
(2, 'exemple', 80, 'ceci est un exemple', 'exemple de résumé', 'Michel exemple', 'exempleShuesha', 2024, 2.1, 'http://exemple.com/images.png', 1, 1, '2024-03-05 12:01:54', '2024-03-05 12:01:54');

-- --------------------------------------------------------

--
-- Structure de la table `t_categories`
--

CREATE TABLE `t_categories` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `t_categories`
--

INSERT INTO `t_categories` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'exempleCategoryUpdate', '2024-03-05 11:50:25', '2024-03-05 13:14:33'),
(2, 'exempleCategory', '2024-03-05 13:05:19', '2024-03-05 13:05:19');

-- --------------------------------------------------------

--
-- Structure de la table `t_comments`
--

CREATE TABLE `t_comments` (
  `id` int NOT NULL,
  `comment` varchar(255) NOT NULL,
  `rate` int DEFAULT NULL,
  `fk_user` int NOT NULL,
  `fk_book` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `t_comments`
--

INSERT INTO `t_comments` (`id`, `comment`, `rate`, `fk_user`, `fk_book`, `createdAt`, `updatedAt`) VALUES
(1, 'ndtndtndtne', 2, 1, 1, '2024-03-05 11:51:17', '2024-03-05 11:51:17');

-- --------------------------------------------------------

--
-- Structure de la table `t_users`
--

CREATE TABLE `t_users` (
  `id` int NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nbrBookRecommended` int NOT NULL,
  `nbrRatingDone` int NOT NULL,
  `nbrCommentsDone` int NOT NULL,
  `EntryDate` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `t_users`
--

INSERT INTO `t_users` (`id`, `username`, `password`, `nbrBookRecommended`, `nbrRatingDone`, `nbrCommentsDone`, `EntryDate`, `updatedAt`) VALUES
(1, 'Thomas', 'gerherthe', 2, 2, 2, '2024-03-05 11:50:06', '2024-03-05 11:50:06');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `t_books`
--
ALTER TABLE `t_books`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`fk_user`),
  ADD KEY `fk_category` (`fk_category`);

--
-- Index pour la table `t_categories`
--
ALTER TABLE `t_categories`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `t_comments`
--
ALTER TABLE `t_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_user` (`fk_user`),
  ADD KEY `fk_book` (`fk_book`);

--
-- Index pour la table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `t_users_username_unique` (`username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `t_books`
--
ALTER TABLE `t_books`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `t_categories`
--
ALTER TABLE `t_categories`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `t_comments`
--
ALTER TABLE `t_comments`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `t_books`
--
ALTER TABLE `t_books`
  ADD CONSTRAINT `t_books_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `t_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `t_books_ibfk_2` FOREIGN KEY (`fk_category`) REFERENCES `t_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `t_comments`
--
ALTER TABLE `t_comments`
  ADD CONSTRAINT `t_comments_ibfk_1` FOREIGN KEY (`fk_user`) REFERENCES `t_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `t_comments_ibfk_2` FOREIGN KEY (`fk_book`) REFERENCES `t_books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
