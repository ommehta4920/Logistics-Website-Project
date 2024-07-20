-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 25, 2024 at 04:41 PM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `swift_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `area_id` int(11) NOT NULL DEFAULT 0,
  `area_name` varchar(20) NOT NULL,
  `area_pincode` varchar(6) NOT NULL,
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`area_id`, `area_name`, `area_pincode`, `city_id`) VALUES
(1, 'Chandlodiya', '382481', 1),
(2, 'Ghatlodiya', '380061', 1),
(3, 'Ranip', '382480', 1),
(4, 'New Ranip', '382478', 1);

-- --------------------------------------------------------

--
-- Table structure for table `booking`
--

CREATE TABLE `booking` (
  `book_id` int(11) NOT NULL,
  `book_date_time` date NOT NULL,
  `pickup_address` longtext NOT NULL,
  `drop_address` longtext NOT NULL,
  `approx_km` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `payment_status` int(11) NOT NULL,
  `cust_id` int(11) NOT NULL,
  `dri_id` int(11) DEFAULT NULL,
  `veh_id` int(11) NOT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `payment_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `booking`
--

INSERT INTO `booking` (`book_id`, `book_date_time`, `pickup_address`, `drop_address`, `approx_km`, `amount`, `payment_status`, `cust_id`, `dri_id`, `veh_id`, `otp`, `payment_type`) VALUES
(1, '2023-02-02', '123, Tejas soc., Chandlodiya, Ahmedabad', '45,Satatya Avenue ,New-ranip ,Ahmedabad', 13, 2784, 1, 20, 1, 1, '4205748', 1),
(2, '2023-02-12', '45,Satatya Avenue ,New-ranip ,Ahmedabad', '510-511, 5th floor D Block, Near YMCA Club, SG Road, Ahmedabad', 25, 12500, 1, 20, 2, 2, '9091235', 2),
(3, '2023-02-22', '510-511, 5th floor D Block, Near YMCA Club, SG Road, Ahmedabad', '801, dev soc., Ghatloadiya, Ahmedabad', 20, 28000, 0, 20, 4, 4, '2669792', 1),
(4, '2013-02-26', '801, dev soc., Ghatloadiya, Ahmedabad', '260, shrinath bunglows, ranip,Ahmedabad', 20, 10000, 0, 2, NULL, 2, '9430221', 2),
(5, '2023-04-24', '260, shrinath bunglows, ranip,Ahmedabad', '405, hari flats, C.G.Road, Ahmedabad', 32, 9600, 0, 2, NULL, 6, NULL, 1),
(6, '2023-04-24', '45,Satatya Avenue ,New-ranip ,Ahmedabad', '510-511, 5th floor D Block, Near YMCA Club, SG Road, Ahmedabad', 10, 2320, 1, 3, 1, 2, '7557109', 2),
(7, '2023-03-03', '510-511, 5th floor D Block, Near YMCA Club, SG Roa...', '801, dev soc., Ghatloadiya, Ahmedabad', 20, 28000, 0, 3, 2, 4, '8129109', 1),
(8, '2023-03-13', '801, dev soc., Ghatloadiya, Ahmedabad', '260, shrinath bunglows, ranip, Ahmedabad', 20, 10000, 0, 3, NULL, 2, '5090484', 2),
(9, '2023-03-20', '260, shrinath bunglows, ranip,Ahmedabad', '405, hari flats, C.G.Road, Ahmedabad', 32, 9600, 0, 3, NULL, 6, NULL, 1),
(10, '2023-03-30', '123, Tejas soc., Chandlodiya, Ahmedabad', '45,Satatya Avenue ,New-ranip ,Ahmedabad', 12, 2784, 1, 3, 4, 1, '2178362', 1),
(11, '2023-04-04', '510-511, 5th floor D Block, Near YMCA Club, SG Roa...', '801, dev soc., Ghatloadiya, Ahmedabad', 20, 28000, 0, 4, 1, 4, '6613090', 1),
(12, '2023-04-08', '801, dev soc., Ghatloadiya, Ahmedabad', '260, shrinath bunglows, ranip, Ahmedabad', 20, 10000, 0, 4, NULL, 2, '7178411', 2),
(13, '2023-04-14', '260, shrinath bunglows, ranip,Ahmedabad', '405, hari flats, C.G.Road, Ahmedabad', 32, 9600, 0, 4, NULL, 6, NULL, 1),
(14, '2023-04-24', '123, Tejas soc., Chandlodiya, Ahmedabad', '45,Satatya Avenue ,New-ranip ,Ahmedabad', 12, 6000, 1, 4, 4, 2, '9724750', 1),
(15, '2023-04-25', '45,Satatya Avenue ,New-ranip ,Ahmedabad', '510-511, 5th floor D Block, Near YMCA Club, SG Road, Ahmedabad', 25, 5800, 1, 4, 4, 1, '6950899', 2),
(17, '2024-06-21', 'ahmedabad', 'surat', 260, 130000, 0, 20, 1, 48, NULL, 1),
(22, '2024-06-25', 'ahmedabad', 'gandhinagar', 28, 4200, 0, 20, 1, 48, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` int(11) NOT NULL,
  `city_name` varchar(30) NOT NULL,
  `state_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `city_name`, `state_id`) VALUES
(1, 'Ahmedabad', 1),
(2, 'Gandhinagar', 1),
(3, 'Surat', 1),
(4, 'Jaipur', 2),
(5, 'Udaipur', 2),
(10, 'Alwar', 2);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cust_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `cust_email` varchar(40) NOT NULL,
  `address` longtext NOT NULL,
  `cust_contact` bigint(20) NOT NULL,
  `password` varchar(500) NOT NULL,
  `is_admin` int(11) NOT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `otp_used` int(11) DEFAULT NULL,
  `area_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `first_name`, `last_name`, `username`, `gender`, `cust_email`, `address`, `cust_contact`, `password`, `is_admin`, `otp`, `otp_used`, `area_id`) VALUES
(19, 'Shubham', 'Patel', 'Shubham', 'Male', 'pshubham86@gmail.com', '29 gokuldham soceity Isanpur ahmedabad,', 9853462509, '123', 1, NULL, NULL, 1),
(20, 'Naitik12', 'Solanki', 'Naitik', 'Male', 'naitik@gmail.com', '30 ekta park soceity,Govindwadi near endramadi school isanpur ahmedabad', 6548919888, '123', 0, NULL, NULL, 2),
(22, 'Divyesh', 'Makwana', 'Divyesh', 'Male', 'divyesh@gmail.com', '30 ekta park soceity,Govindwadi near endramadi school isanpur ahmedabad', 6576419888, '123', 1, NULL, NULL, 2),
(23, 'Neha', 'hemani', 'Neha_12', 'Female', 'Neha@gmail.com', '35 Ranchod park soc near sda secondary school haripura maninagar', 6548919444, 'asd', 1, NULL, NULL, 3),
(25, 'dwefwe', 'wff', 'stud_it', 'Male', 'sam@gmail.com', 'hxuhbcyrfyurfureuyey', 9853462509, '123', 0, NULL, NULL, 1),
(26, 'Om', 'Patel', 'Om', 'Male', 'omhello@gmail.com', 'hbweufufybeufhjwdbvuyyu', 9853469052, '123', 0, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

CREATE TABLE `driver` (
  `dri_id` int(11) NOT NULL,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `username` varchar(20) NOT NULL,
  `gender` varchar(6) NOT NULL,
  `dri_email` varchar(40) NOT NULL,
  `password` varchar(500) NOT NULL,
  `dri_contact` bigint(20) NOT NULL,
  `dri_license` varchar(20) NOT NULL,
  `is_available` tinyint(1) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `otp_used` int(11) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `area` int(11) NOT NULL,
  `alloted_vehicle` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`dri_id`, `first_name`, `last_name`, `username`, `gender`, `dri_email`, `password`, `dri_contact`, `dri_license`, `is_available`, `otp`, `otp_used`, `address`, `area`, `alloted_vehicle`) VALUES
(1, 'Mubin', 'Mansuri', 'Mubin', 'Male', 'pshubham86@gmail.com', '123', 9853462509, 'GJ02 12345678901', 1, NULL, NULL, 'E-104 Vatava ring road', 0, 48),
(2, 'Kaif', 'Kazi', 'kaif_12', 'Male', 'kaif.kazi20@gmail.com', '123', 7211533921, 'GJ02 12345678902', 1, '59637', 1, '', 0, NULL),
(3, 'Rahul', 'Shah', 'Rahul_Shah_12', 'Male', 'rahulshah97@gmail.com', '123', 9525157567, 'GJ01 12345678901', 1, '92973', 1, '', 0, NULL),
(4, 'Shubh', 'Patel', 'shubh_1234', 'Male', 'shubhpatel14@gmail.com', '123', 7001494526, 'GJ01 12345678912', 1, NULL, NULL, '', 0, NULL),
(8, 'dwefwe', 'wff', 'sam', 'Female', 'ambaji@gmail.com', '123', 8401844997, '1234', NULL, NULL, NULL, 'iugyfrgfuyrgfyuefyu', 1, NULL),
(10, 'Jeet', 'Singhania', 'Jeet', 'Male', 'Jeet@gmail.com', '1234', 8401856238, 'GJ -JK-203', NULL, NULL, NULL, 'fiuwegfuygsdbvgyudgvhbuy', 2, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feed_id` int(11) NOT NULL DEFAULT 0,
  `feed_desc` longtext NOT NULL,
  `feed_date` date NOT NULL,
  `cust_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feed_id`, `feed_desc`, `feed_date`, `cust_id`) VALUES
(1, 'Excellent service by multiple drivers. I own a business and do multiple shiftings. Rather than ask local drivers and bargain every time, I use porter which fulfils all my need. Thanks a lot!', '2023-02-22', 3),
(2, 'Way better than naaka waalas. Have shifted all my logistics needs to Porter and I can now safely focus on my business growth. Amazing service!', '2023-03-13', 2),
(3, 'Have had an amazing experience. Had three successful deliveries where it’s a struggle to arrange a tempo service for your desired pickup and drop off. Must try this app!', '2023-02-26', 3),
(4, 'They providing fast and good service. I was amazing and surprised at how well they did everything. great experience The packers and movers.', '2023-04-08', 4),
(5, 'They do things quickly and you can shift to your destination without having to worry about wasting your time.', '2023-04-24', 4);

-- --------------------------------------------------------

--
-- Table structure for table `state`
--

CREATE TABLE `state` (
  `state_id` int(11) NOT NULL,
  `state_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `state`
--

INSERT INTO `state` (`state_id`, `state_name`) VALUES
(1, 'Gujarat12'),
(2, 'Rajasthan'),
(3, 'Maharastra');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_category`
--

CREATE TABLE `vehicle_category` (
  `cate_id` int(11) NOT NULL DEFAULT 0,
  `cate_type` varchar(30) NOT NULL,
  `cate_img` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicle_category`
--

INSERT INTO `vehicle_category` (`cate_id`, `cate_type`, `cate_img`) VALUES
(1, 'Tata Ace', 'tataace.jpg'),
(2, 'Eicher19', 'eicher19.jpeg'),
(3, 'Tata Tauras', 'TataTaurus.jpeg'),
(4, 'Container 32FT SXL', 'sxlcontainer.jpeg'),
(5, 'Ashok LeyLand Dost', 'ashokleylanddost.jpg'),
(6, 'Mahindra Bolero', 'mbp.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_details`
--

CREATE TABLE `vehicle_details` (
  `veh_id` int(11) NOT NULL,
  `veh_no` varchar(15) NOT NULL,
  `chassis_no` varchar(20) NOT NULL,
  `rent` bigint(20) NOT NULL,
  `veh_desc` longtext NOT NULL,
  `capacity` int(11) NOT NULL,
  `size` varchar(25) DEFAULT NULL,
  `dri_id` int(11) DEFAULT NULL,
  `veh_image` varchar(350) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vehicle_details`
--

INSERT INTO `vehicle_details` (`veh_id`, `veh_no`, `chassis_no`, `rent`, `veh_desc`, `capacity`, `size`, `dri_id`, `veh_image`) VALUES
(1, 'GJ-01-SS-333', '2H2XA59BWDY987665', 232, 'Tata super ace', 1000, '7L x 4.8W x 4.8H', NULL, NULL),
(2, 'GJ-01-UG-9250', '4S3BMHB68B3286050', 500, 'Eicher model power', 9000, '19L x 7W x 7H', NULL, NULL),
(3, 'GJ-01-SS-4444', '5D8CMSB70A2397161', 800, 'Tauras truck', 21000, '24L x 7.3W x 7H', NULL, NULL),
(4, 'GJ-01-AS-8888', '9W4ZA59BWDY382302', 1400, 'Ashok leyland Power', 40000, '32L x 8W x 8H', NULL, NULL),
(5, 'GJ-01-RR-5555', '4T4WA59BWDY982332', 240, 'Ashok leyland Dost', 1000, '7L x 4.8W x 4.8H', NULL, NULL),
(6, 'GJ-18-AB-2736', '1G7UN05AWDY230318', 300, 'Bharat benz', 1700, '8L x 4.8W x 4.8H', NULL, NULL),
(48, 'GJ-203-NR-203', '4T4WA59BWDY982332', 94, 'ASHOKA PRO', 1400, NULL, 1, 'image_1716701135112.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`book_id`),
  ADD UNIQUE KEY `book_id` (`book_id`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`),
  ADD KEY `city_ibfk_1` (`state_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`),
  ADD UNIQUE KEY `cust_email` (`cust_email`);

--
-- Indexes for table `driver`
--
ALTER TABLE `driver`
  ADD PRIMARY KEY (`dri_id`),
  ADD UNIQUE KEY `dri_email` (`dri_email`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feed_id`);

--
-- Indexes for table `state`
--
ALTER TABLE `state`
  ADD PRIMARY KEY (`state_id`);

--
-- Indexes for table `vehicle_details`
--
ALTER TABLE `vehicle_details`
  ADD PRIMARY KEY (`veh_id`),
  ADD KEY `vehicle_details_ibfk_1` (`dri_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `booking`
--
ALTER TABLE `booking`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cust_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `driver`
--
ALTER TABLE `driver`
  MODIFY `dri_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `state`
--
ALTER TABLE `state`
  MODIFY `state_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `vehicle_details`
--
ALTER TABLE `vehicle_details`
  MODIFY `veh_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `city`
--
ALTER TABLE `city`
  ADD CONSTRAINT `city_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `state` (`state_id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
