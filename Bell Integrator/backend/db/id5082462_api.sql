-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Хост: localhost
-- Время создания: Май 22 2018 г., 21:29
-- Версия сервера: 10.1.31-MariaDB
-- Версия PHP: 7.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `id5082462_api`
--

-- --------------------------------------------------------

--
-- Структура таблицы `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `countries`
--

INSERT INTO `countries` (`id`, `code`, `name`) VALUES
(1, 643, 'Российская Федерация'),
(2, 644, 'Узбекистан'),
(3, 645, 'Казахстан');

-- --------------------------------------------------------

--
-- Структура таблицы `docs`
--

CREATE TABLE `docs` (
  `id` int(11) NOT NULL,
  `code` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `docs`
--

INSERT INTO `docs` (`id`, `code`, `name`) VALUES
(1, 21, 'Паспорт гражданина РФ'),
(2, 22, 'Загран. паспорт'),
(3, 23, 'Свидетельство о рождении');

-- --------------------------------------------------------

--
-- Структура таблицы `logins`
--

CREATE TABLE `logins` (
  `id` int(11) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `logins`
--

INSERT INTO `logins` (`id`, `login`, `password`) VALUES
(1, 'jck1989', 'jck30011989'),
(2, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Структура таблицы `offices`
--

CREATE TABLE `offices` (
  `id` int(11) NOT NULL,
  `orgId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `offices`
--

INSERT INTO `offices` (`id`, `orgId`, `name`, `address`, `phone`, `isActive`) VALUES
(1, 1, 'Офис 1', 'Московская 27 - 1', '8 (841) 220-00-01', 1),
(2, 1, 'Офис 2', 'Московская 27 - 2', '8 (841) 220-00-02', 0),
(6, 2, 'Офис 4', 'Московская 27 - 4', '8 (841) 220-00-04', 1),
(7, 2, 'Офис 5', 'Московская 27 - 4', '8 (841) 220-00-04', 1),
(13, 146, 'fgdsg', 'dfgfdsg', 'dfgfds', 0),
(14, 1, 'sadfsdaf', 'sdfsaf', 'dsfdasf', 0),
(15, 1, 'проверка', 'проверка', 'проверка', 0),
(17, 157, 'еще один офис', '123123', '123123', 1),
(20, 130, 'adawd', 'awdawdwa', 'awdawda', 1),
(21, 5, 'sdfsd', 'fsdfsdf', 'sdfsdf', 1),
(22, 5, 'fdfasd', 'sdfsdf', 'sdfsda', 0),
(23, 161, 'sfbSDFbSADFbDASb', '', '', 0),
(24, 163, 'fdgfd', 'dfgdf', 'fddfgdf', 0),
(25, 164, 'Новый офис', '123123123', '123123123', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `organizations`
--

CREATE TABLE `organizations` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `inn` varchar(255) NOT NULL,
  `kpp` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `isActive` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `organizations`
--

INSERT INTO `organizations` (`id`, `name`, `fullName`, `inn`, `kpp`, `address`, `phone`, `isActive`) VALUES
(131, 'Организация 7', 'ООО Организация №7', '5836333447', '583601007', 'Суворова 190 - 27', '8 (800) 2000607', 1),
(149, 'организация 1', '123123123', '123123123', '', '', '', 1),
(161, 'qqwqwqw', 'dwdwdw', 'awdawd', 'ddd', 'ww', 'dwdwd', 1),
(164, 'Новая организация', 'ООО \"Новая организация\"', '123123123', '123123', '123123123', '123123123', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `officeId` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `position` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `docCode` int(11) NOT NULL,
  `docName` varchar(255) NOT NULL,
  `docNumber` varchar(255) NOT NULL,
  `docDate` varchar(255) NOT NULL,
  `citizenshipCode` int(11) NOT NULL,
  `citizenshipName` varchar(255) NOT NULL,
  `isIdentified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `officeId`, `firstName`, `lastName`, `middleName`, `position`, `phone`, `docCode`, `docName`, `docNumber`, `docDate`, `citizenshipCode`, `citizenshipName`, `isIdentified`) VALUES
(1, 1, 'Евгений', 'Старостин', 'Валерьевич', 'Front-end developer', '89374084518', 21, 'Паспорт гражданина РФ', '56 03 123451', '01.01.2000', 643, 'Российская Федерация', 1),
(2, 1, 'Иван', 'Иванов', 'Иванович', 'Архитектор', '89001234567', 22, 'Загран паспорт', '56 03 123452', '01.01.2000', 643, 'Российская Федерация', 1),
(4, 0, '666', '666', '666', '666', '666', 21, 'Паспорт гражданина РФ', '666', '666', 643, 'Российская Федерация', 1),
(6, 1, 'sfsadf', 'sdfdsaf', 'sdfdsf', 'sdfsdaf', 'sdafdsafsa', 21, 'Паспорт гражданина РФ', 'sdfsadf', 'sdfdsaf', 643, 'Российская Федерация', 0),
(7, 1, '123', '123', '123', '123', '123', 21, 'Паспорт гражданина РФ', '123', '123', 643, 'Российская Федерация', 1),
(8, 1, '666666', '666666', '666666', '666666', '666666', 21, 'Паспорт гражданина РФ', '666666', '666666', 643, 'Российская Федерация', 1),
(9, 1, 'gdsfg', 'dfsgfdsg', 'dfsgdfsg', 'dsfgfsd', 'gdsfgdsg', 21, 'Паспорт гражданина РФ', 'dfgfds', 'fdgfds', 643, 'Российская Федерация', 0),
(10, 1, 'сотрудник', 'сотрудник', 'сотрудник', 'должность', 'телефон', 21, 'Паспорт гражданина РФ', '5609 123123', '30.01.2018', 643, 'Российская Федерация', 1),
(11, 17, 'проверочный сотрудник', '', '', '', '', 21, 'Паспорт гражданина РФ', '', '', 643, 'Российская Федерация', 0),
(12, 14, 'gfhgfd', 'hfgdhfdgh', '', '', '', 21, 'Паспорт гражданина РФ', '', '', 643, 'Российская Федерация', 0),
(13, 21, 'sdfsd', 'fssdfsdf', 'sdfsdfsdf', '', '', 21, 'Паспорт гражданина РФ', '', '', 643, 'Российская Федерация', 0),
(14, 25, 'Новый сотрудник', '123123123', '123123123', '123123123', '123123123', 21, 'Паспорт гражданина РФ', '123123123', '123123123', 643, 'Российская Федерация', 1),
(15, 23, '', '', '', '', '', 23, 'Свидетельство о рождении', '', '', 644, 'Узбекистан', 0),
(16, 23, 'dawdawd', 'awdawdaw', 'dawdawd', 'wdwd', 'wdwdwdwd', 21, 'Паспорт гражданина РФ', 'dwdwdw', 'dwdwdwdwdw', 643, 'Российская Федерация', 0);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `docs`
--
ALTER TABLE `docs`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `logins`
--
ALTER TABLE `logins`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `offices`
--
ALTER TABLE `offices`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `organizations`
--
ALTER TABLE `organizations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `docs`
--
ALTER TABLE `docs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `logins`
--
ALTER TABLE `logins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `offices`
--
ALTER TABLE `offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `organizations`
--
ALTER TABLE `organizations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=165;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
