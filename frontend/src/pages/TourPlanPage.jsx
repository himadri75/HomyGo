import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaSearch,
  FaRoute,
  FaStar,
  FaLocationArrow,
  FaDirections,
  FaSun,
  FaCloudSun,
  FaCheck,
  FaTimes
} from "react-icons/fa";
import { dummyPlaces } from "../assets/asset";

const allCitiesData = {
  kolkata: [
    { id: 1, name: "Victoria Memorial", distance: 3.2, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Victoria_Memorial_situated_in_Kolkata.jpg/960px-Victoria_Memorial_situated_in_Kolkata.jpg" },
    { id: 2, name: "Howrah Bridge", distance: 5.1, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Howrah_bridge_at_night.jpg/960px-Howrah_bridge_at_night.jpg" },
    { id: 3, name: "Dakshineswar Temple", distance: 8.5, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG/960px-Dakhineshwar_Temple_beside_the_Hoogly%2C_West_Bengal.JPG" },
    { id: 4, name: "Indian Museum", distance: 2.8, rating: 4.3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg/960px-Indian_Museum%2C_Courtyard%2C_Kolkata%2C_India.jpg" }
  ],
  delhi: [
    { id: 5, name: "Red Fort", distance: 4.1, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Delhi_fort.jpg/960px-Delhi_fort.jpg" },
    { id: 6, name: "India Gate", distance: 3.4, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/India_Gate_%28All_India_War_Memorial%29.jpg/960px-India_Gate_%28All_India_War_Memorial%29.jpg" },
    { id: 7, name: "Qutub Minar", distance: 12.2, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Qutb_Minar_2022.jpg/960px-Qutb_Minar_2022.jpg" },
    { id: 8, name: "Lotus Temple", distance: 15, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/LotusDelhi.jpg/960px-LotusDelhi.jpg" }
  ],
  mumbai: [
    { id: 9, name: "Gateway of India", distance: 2.1, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg/960px-Mumbai_03-2016_30_Gateway_of_India.jpg" },
    { id: 10, name: "Marine Drive", distance: 3.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Mumbai_03-2016_27_skyline_at_Marine_Drive.jpg/960px-Mumbai_03-2016_27_skyline_at_Marine_Drive.jpg" },
    { id: 11, name: "Elephanta Caves", distance: 11.2, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Elephanta_Caves_Trimurti.jpg/960px-Elephanta_Caves_Trimurti.jpg" },
    { id: 12, name: "Juhu Beach", distance: 18.3, rating: 4.2, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Juhu_beach_%28Arial%29.jpg/960px-Juhu_beach_%28Arial%29.jpg" }
  ],
  goa: [
    { id: 13, name: "Calangute Beach", distance: 14.5, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Sunset_at_Calangute.jpg/960px-Sunset_at_Calangute.jpg" },
    { id: 14, name: "Basilica of Bom Jesus", distance: 9.2, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Front_Elevation_of_Basilica_of_Bom_Jesus.jpg/960px-Front_Elevation_of_Basilica_of_Bom_Jesus.jpg" },
    { id: 15, name: "Dudhsagar Falls", distance: 45, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Doodhsagar_Fall.jpg/960px-Doodhsagar_Fall.jpg" },
    { id: 16, name: "Fort Aguada", distance: 16.1, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Fort_aguada.jpg/960px-Fort_aguada.jpg" }
  ],
  jaipur: [
    { id: 17, name: "Hawa Mahal", distance: 1.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg/960px-East_facade_Hawa_Mahal_Jaipur_from_ground_level_%28July_2022%29_-_img_01.jpg" },
    { id: 18, name: "Amer Fort", distance: 11, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg/960px-20191219_Fort_Amber%2C_Amer%2C_Jaipur_0955_9481.jpg" },
    { id: 19, name: "City Palace", distance: 1.2, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Chandra_Mahal%2C_City_Palace%2C_Jaipur%2C_20191218_0951_9043.jpg/960px-Chandra_Mahal%2C_City_Palace%2C_Jaipur%2C_20191218_0951_9043.jpg" },
    { id: 20, name: "Jantar Mantar", distance: 1.3, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Jantar_Mantar_at_Jaipur.jpg/960px-Jantar_Mantar_at_Jaipur.jpg" }
  ],
  agra: [
    { id: 21, name: "Taj Mahal", distance: 2.5, rating: 4.9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/960px-Taj_Mahal_%28Edited%29.jpeg" },
    { id: 22, name: "Agra Fort", distance: 3.2, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Agra_03-2016_10_Agra_Fort.jpg/960px-Agra_03-2016_10_Agra_Fort.jpg" },
    { id: 23, name: "Fatehpur Sikri", distance: 36.5, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg/960px-Fatehput_Sikiri_Buland_Darwaza_gate_2010.jpg" },
    { id: 24, name: "Mehtab Bagh", distance: 7.1, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Mehtab_Bagh_facing_Taj_Mahal.JPG/960px-Mehtab_Bagh_facing_Taj_Mahal.JPG" }
  ],
  darjeeling: [
    { id: 25, name: "Tiger Hill", distance: 11.2, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Tiger_Hill_Darjeeling_West_Bengal_India_%283%29.JPG/960px-Tiger_Hill_Darjeeling_West_Bengal_India_%283%29.JPG" },
    { id: 26, name: "Batasia Loop", distance: 4.5, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Batasia_Loop_War_Memorial_with_Kanchanjunga.jpg/960px-Batasia_Loop_War_Memorial_with_Kanchanjunga.jpg" },
    { id: 27, name: "Toy Train Station", distance: 0.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ghum_Railway_station.jpg/960px-Ghum_Railway_station.jpg" },
    { id: 28, name: "Happy Valley Tea Estate", distance: 2.8, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Happy_Valley_Tea_Estate%2C_Darjeeling.jpg/960px-Happy_Valley_Tea_Estate%2C_Darjeeling.jpg" }
  ],
  varanasi: [
    { id: 29, name: "Kashi Vishwanath Temple", distance: 0.8, rating: 4.9, img: "https://upload.wikimedia.org/wikipedia/commons/f/ff/Kashi_Vishwanath.jpg" },
    { id: 30, name: "Dashashwamedh Ghat", distance: 0.5, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Dasaswamedh_ghat-varanasi_india-andres_larin.jpg/960px-Dasaswamedh_ghat-varanasi_india-andres_larin.jpg" },
    { id: 31, name: "Assi Ghat", distance: 2.2, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Assi_Ghat_Varanasi_morning_Aarti.jpg/960px-Assi_Ghat_Varanasi_morning_Aarti.jpg" },
    { id: 32, name: "Sarnath", distance: 9.5, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Ancient_Buddhist_monasteries_near_Dhamekh_Stupa_Monument_Site%2C_Sarnath.jpg/960px-Ancient_Buddhist_monasteries_near_Dhamekh_Stupa_Monument_Site%2C_Sarnath.jpg" }
  ],
  bangalore: [
    { id: 33, name: "Lalbagh Botanical Garden", distance: 4.5, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Glasshouse_and_fountain_at_lalbagh.jpg/960px-Glasshouse_and_fountain_at_lalbagh.jpg" },
    { id: 34, name: "Bangalore Palace", distance: 3.2, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bangalore_Mysore_Maharaja_Palace.jpg/960px-Bangalore_Mysore_Maharaja_Palace.jpg" },
    { id: 35, name: "Cubbon Park", distance: 1.5, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Cubbon_Park_W.jpg/960px-Cubbon_Park_W.jpg" },
    { id: 36, name: "Nandi Hills", distance: 60, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Sunrise_at_Nandi_Hills.jpg/960px-Sunrise_at_Nandi_Hills.jpg" }
  ],
  kochi: [
    { id: 37, name: "Chinese Fishing Nets", distance: 0.2, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Chinese_Fishing_Net_Raising_Birds_Sunrise_Ashtamudi_Kollam_Mar22_A7C_01784.jpg/960px-Chinese_Fishing_Net_Raising_Birds_Sunrise_Ashtamudi_Kollam_Mar22_A7C_01784.jpg" },
    { id: 38, name: "Mattancherry Palace", distance: 3.8, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Mattancherry_Palace_DSC_0899.JPG/960px-Mattancherry_Palace_DSC_0899.JPG" },
    { id: 39, name: "Hill Palace Museum", distance: 12.5, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Hill_Palace_Cochin_%2824176740822%29.jpg/960px-Hill_Palace_Cochin_%2824176740822%29.jpg" },
    { id: 40, name: "Cherai Beach", distance: 24, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Sunrise_at_Cherai_Beach.jpg/960px-Sunrise_at_Cherai_Beach.jpg" }
  ],
  srinagar: [
    { id: 41, name: "Dal Lake", distance: 1.5, rating: 4.9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/Dal_Lake_Hazratbal_Srinagar.jpg/960px-Dal_Lake_Hazratbal_Srinagar.jpg" },
    { id: 42, name: "Shalimar Bagh", distance: 12, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Shalimar_Bagh_1.jpg/960px-Shalimar_Bagh_1.jpg" },
    { id: 43, name: "Nishat Bagh", distance: 9.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Nishat_Bagh.JPG/960px-Nishat_Bagh.JPG" },
    { id: 44, name: "Hazratbal Shrine", distance: 8.2, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/HAZRATBAL_SHRINE_01.JPG/960px-HAZRATBAL_SHRINE_01.JPG" }
  ],
  amritsar: [
    { id: 45, name: "Golden Temple", distance: 1.2, rating: 4.9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/The_Golden_Temple_of_Amrithsar_7.jpg/960px-The_Golden_Temple_of_Amrithsar_7.jpg" },
    { id: 46, name: "Jallianwala Bagh", distance: 1.5, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Jallianwala_Bagh%2C_Amritsar_01.jpg/960px-Jallianwala_Bagh%2C_Amritsar_01.jpg" },
    { id: 47, name: "Wagah Border", distance: 30, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/The_SAARC_Car_Rally_2007_being_welcomed_by_traditional_Drummers_at_the_Wagah_Border_on_March_28%2C_2007.jpg/960px-The_SAARC_Car_Rally_2007_being_welcomed_by_traditional_Drummers_at_the_Wagah_Border_on_March_28%2C_2007.jpg" },
    { id: 48, name: "Durgiana Temple", distance: 2.5, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Many_of_the_locals_we_had_spoken_to_were_delighted_that_the_Govt_has_sanctioned_funds_for_renovation_of_this_temple_%2838049489065%29.jpg/960px-Many_of_the_locals_we_had_spoken_to_were_delighted_that_the_Govt_has_sanctioned_funds_for_renovation_of_this_temple_%2838049489065%29.jpg" }
  ],
  udaipur: [
    { id: 49, name: "Lake Palace", distance: 1.8, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Udaipur_Lake_Palace.jpg/960px-Udaipur_Lake_Palace.jpg" },
    { id: 50, name: "City Palace Udaipur", distance: 1.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Udaipur_City_Palace.jpg/960px-Udaipur_City_Palace.jpg" },
    { id: 51, name: "Jag Mandir", distance: 2.3, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/JagMandir.jpg/960px-JagMandir.jpg" },
    { id: 52, name: "Sajjangarh Monsoon Palace", distance: 8.5, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/2/20/Monsoon_Palace.jpg" }
  ],
  hyderabad: [
    { id: 53, name: "Charminar", distance: 1, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Charminar_Hyderabad_1.jpg/960px-Charminar_Hyderabad_1.jpg" },
    { id: 54, name: "Golconda Fort", distance: 11.2, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Golconda_Fort_005.jpg/960px-Golconda_Fort_005.jpg" },
    { id: 55, name: "Hussain Sagar Lake", distance: 6.5, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Hussain_sagar_sunset.jpg/960px-Hussain_sagar_sunset.jpg" },
    { id: 56, name: "Salargunj Museum", distance: 2.8, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Salar_Jung_Museum%2C_Hyderabad%2C_India.jpg/960px-Salar_Jung_Museum%2C_Hyderabad%2C_India.jpg" }
  ],
  chennai: [
    { id: 57, name: "Marina Beach", distance: 2, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Chennai_-_bird%27s-eye_view.jpg/960px-Chennai_-_bird%27s-eye_view.jpg" },
    { id: 58, name: "Kapaleeshwarar Temple", distance: 4.8, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/9/99/Kapaleeswarar1.jpg" },
    { id: 59, name: "Fort St. George", distance: 3.5, rating: 4.3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Fort_St._George%2C_Chennai_2.jpg/960px-Fort_St._George%2C_Chennai_2.jpg" },
    { id: 60, name: "VGP Golden Beach", distance: 18, rating: 4.2, img: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800" }
  ],
  shimla: [
    { id: 61, name: "The Ridge", distance: 0.1, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/The_Ridge_Shimla_5.jpg/960px-The_Ridge_Shimla_5.jpg" },
    { id: 62, name: "Jakhoo Temple", distance: 2.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jakhoo_temple.jpg/960px-Jakhoo_temple.jpg" },
    { id: 63, name: "Mall Road", distance: 0.2, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Mall_Road_Shimla_1.jpg/960px-Mall_Road_Shimla_1.jpg" },
    { id: 64, name: "Kufri Adventure Park", distance: 14.8, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Kufri_hills.jpg/960px-Kufri_hills.jpg" }
  ],
  ooty: [
    { id: 65, name: "Government Botanical Garden", distance: 1.5, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Botanical_Gardens_-_Ootacamund_%28Ooty%29_-_India_03.JPG/960px-Botanical_Gardens_-_Ootacamund_%28Ooty%29_-_India_03.JPG" },
    { id: 66, name: "Ooty Lake", distance: 2.8, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ooty_Lake_in_Tamil_Nadu_04.jpg/960px-Ooty_Lake_in_Tamil_Nadu_04.jpg" },
    { id: 67, name: "Doddabetta Peak", distance: 9, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Arts_College_Hill_Ooty_Nilgiris_Mar21_A7C_00188.jpg/960px-Arts_College_Hill_Ooty_Nilgiris_Mar21_A7C_00188.jpg" },
    { id: 68, name: "Pykara Waterfalls", distance: 21, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/2/29/Pykara_Temple.jpg" }
  ],
  manali: [
    { id: 69, name: "Hadimba Temple", distance: 1.8, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Hidimba_Devi_Temple_-_North-east_View_-_Manali_2014-05-11_2648-2649.TIF/lossy-page1-960px-Hidimba_Devi_Temple_-_North-east_View_-_Manali_2014-05-11_2648-2649.TIF.jpg" },
    { id: 70, name: "Solang Valley", distance: 13, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG/960px-Solang_Valley_%2CManali%2C_Himachal_Pardes%2C_India.JPG" },
    { id: 71, name: "Jogini Waterfall", distance: 4.2, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Manali_City.jpg/960px-Manali_City.jpg" },
    { id: 72, name: "Vashisht Hot Water Springs", distance: 3.5, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Vashisht_temple.jpg/960px-Vashisht_temple.jpg" }
  ],
  patna: [
    { id: 73, name: "Golghar", distance: 2.5, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Golghar_%E0%A5%AA.jpg/960px-Golghar_%E0%A5%AA.jpg" },
    { id: 74, name: "Patna Museum", distance: 1.8, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Patna_Museum_-_General_View_%289221515542%29.jpg/960px-Patna_Museum_-_General_View_%289221515542%29.jpg" },
    { id: 75, name: "Sanjay Gandhi Biological Park", distance: 5.2, rating: 4.3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Sanjay_Gandhi_Jaivik_Udyan.jpg/960px-Sanjay_Gandhi_Jaivik_Udyan.jpg" },
    { id: 76, name: "Buddha Smriti Park", distance: 3.1, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Buddha_Smriti_Park.jpg/960px-Buddha_Smriti_Park.jpg" }
  ],
  guwahati: [
    { id: 77, name: "Kamakhya Temple", distance: 8.2, rating: 4.9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Kamakhya_Temple_-_DEV_8829.jpg/960px-Kamakhya_Temple_-_DEV_8829.jpg" },
    { id: 78, name: "Umananda Island", distance: 2.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Umananda_Island%2C_Guwahati_%284%29.jpg/960px-Umananda_Island%2C_Guwahati_%284%29.jpg" },
    { id: 79, name: "Assam State Museum", distance: 1.2, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/1/19/Assam_State_Museum.jpg" },
    { id: 80, name: "Brahmaputra River Heritage Center", distance: 1.5, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Guwahati_citysky.jpg/960px-Guwahati_citysky.jpg" }
  ],
  lucknow: [
    { id: 81, name: "Bara Imambara", distance: 4.8, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Bara_Imambara_Lucknow.jpg/960px-Bara_Imambara_Lucknow.jpg" },
    { id: 82, name: "Chhota Imambara", distance: 6.2, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Chhota_imambara_Lucknow.jpg/960px-Chhota_imambara_Lucknow.jpg" },
    { id: 83, name: "Rumi Darwaza", distance: 4.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Rumi_Darwaza_-_DSC2797-01.jpg/960px-Rumi_Darwaza_-_DSC2797-01.jpg" },
    { id: 84, name: "British Residency Lucknow", distance: 2.1, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Office_-_The_Residency_-_Lucknow_-_India.jpg/960px-Office_-_The_Residency_-_Lucknow_-_India.jpg" }
  ],
  pune: [
    { id: 85, name: "Shaniwar Wada", distance: 1.5, rating: 4.5, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Front_view_of_Shaniwar_Wada_illuminated.jpg/960px-Front_view_of_Shaniwar_Wada_illuminated.jpg" },
    { id: 86, name: "Aga Khan Palace", distance: 7.8, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Pune_Palace.jpg/960px-Pune_Palace.jpg" },
    { id: 87, name: "Sinhagad Fort", distance: 30, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Sinhagad.jpg/960px-Sinhagad.jpg" },
    { id: 88, name: "Dagadusheth Halwai Ganapati Temple", distance: 1.8, rating: 4.9, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Dagdusheth_Ganpati_Temple_Decorated_during_Ganesh_Chaturti_September_2012_%281%29.JPG/960px-Dagdusheth_Ganpati_Temple_Decorated_during_Ganesh_Chaturti_September_2012_%281%29.JPG" }
  ],
  ahmedabad: [
    { id: 89, name: "Sabarmati Ashram", distance: 4.2, rating: 4.8, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/GANDHI_ASHRAM_03.jpg/960px-GANDHI_ASHRAM_03.jpg" },
    { id: 90, name: "Adalaj Stepwell", distance: 18.5, rating: 4.7, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Adalaj_ki_Vav_Gujarat_240A1370_72.jpg/960px-Adalaj_ki_Vav_Gujarat_240A1370_72.jpg" },
    { id: 91, name: "Kankaria Lake", distance: 5.1, rating: 4.4, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Kankaria_Carnival_2_Ahmedabad.JPG/960px-Kankaria_Carnival_2_Ahmedabad.JPG" },
    { id: 92, name: "Jama Masjid Ahmedabad", distance: 2.5, rating: 4.6, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Jama_Masjid%2C_Ahmedabad_01.jpg/960px-Jama_Masjid%2C_Ahmedabad_01.jpg" }
  ]
};

const generateDynamicPlaces = (city) => {
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1);
  return [
    {
      id: 101,
      name: `${formattedCity} Botanical Gardens & Lake`,
      distance: 2.4,
      rating: 4.5,
      img: "https://images.unsplash.com/photo-1597055181300-e3633a207518?w=800"
    },
    {
      id: 102,
      name: `${formattedCity} Fort & Heritage Palace`,
      distance: 4.8,
      rating: 4.7,
      img: "https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800"
    },
    {
      id: 103,
      name: `Sacred ${formattedCity} Temple & Shrine`,
      distance: 7.2,
      rating: 4.8,
      img: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800"
    },
    {
      id: 104,
      name: `${formattedCity} Local Cultural Bazaar`,
      distance: 1.5,
      rating: 4.4,
      img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800"
    }
  ];
};

const TourPlanPage = () => {
  const [location, setLocation] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [plan, setPlan] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [showDirectionsModal, setShowDirectionsModal] = useState(false);
  
  /* ---------------- Location Fetch ---------------- */

  const detectLocation = () => {
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        let city = "delhi";
        if (lat > 20 && lat < 25) {
          city = "kolkata";
        }
        setLocation(city);
        setPlaces(allCitiesData[city]);
        setSelectedPlaces([]);
        setPlan(null);
        setLoadingLocation(false);
      },
      () => {
        alert("Location permission denied");
        setLoadingLocation(false);
      }
    );
  };

  const searchLocation = (cityName = null) => {
    const activeCity = (cityName || location).trim();
    if (!activeCity) return;

    const key = activeCity.toLowerCase();
    let cityPlaces = allCitiesData[key];

    if (!cityPlaces) {
      cityPlaces = generateDynamicPlaces(activeCity);
    }

    setPlaces(cityPlaces);
    setSelectedPlaces([]);
    setPlan(null);
    setLocation(activeCity);
  };

  const togglePlace = (place) => {
    const exists = selectedPlaces.find(p => p.id === place.id);
    if (exists) {
      setSelectedPlaces(selectedPlaces.filter(p => p.id !== place.id));
    } else {
      setSelectedPlaces([...selectedPlaces, place]);
    }
  };

  const generatePlan = () => {
    if (selectedPlaces.length === 0) {
      alert("Select places first");
      return;
    }

    const sorted = [...selectedPlaces].sort(
      (a, b) => a.distance - b.distance
    );

    setPlan({
      morning: sorted.slice(0, 2),
      afternoon: sorted.slice(2, 4),
      totalDistance: sorted.reduce((sum, p) => sum + p.distance, 0)
    });
  };

  const handleOpenGoogleMaps = () => {
    const citySuffix = `, ${location}`;
    const allStops = [...plan.morning, ...plan.afternoon];
    if (allStops.length === 0) return;

    const origin = allStops[0].name + citySuffix;
    const destination = allStops[allStops.length - 1].name + citySuffix;
    const remainingStops = allStops.slice(1, -1);
    
    let waypointsQuery = "";
    if (remainingStops.length > 0) {
      waypointsQuery = "&waypoints=" + remainingStops.map(p => encodeURIComponent(p.name + citySuffix)).join('|');
    }
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}${waypointsQuery}`;
    window.open(url, '_blank');
  };

  /* ---------------- UI ---------------- */

  return (
    <section className="relative bg-gradient-to-tr from-blue-50 via-indigo-50 to-emerald-50/30 dark:from-slate-950 dark:via-slate-950 dark:to-indigo-950/20 min-h-screen py-16 transition-colors duration-500 overflow-hidden">
      
      {/* Glow Spots */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-400/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-emerald-400/10 dark:bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 z-10">

        {/* Title Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 dark:bg-blue-400/10 text-blue-700 dark:text-blue-300 border border-blue-200/50 dark:border-blue-900/30 mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
            AI Travel Engines
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight leading-none">
            AI Tour Planner
          </h1>

          <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Craft your personalized day routes. Search a destination, select your favorite cultural and local landmarks, and let our AI generate an optimized, seamless day plan.
          </p>
        </div>

        {/* Search Bar capsule */}
        <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 mb-10 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                placeholder="Enter city (Kolkata / Delhi / Darjeeling / Mumbai...)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") searchLocation(); }}
                className="w-full p-4 pl-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            </div>

            <button
              onClick={() => searchLocation()}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold px-7 py-4 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20 active:scale-98 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaRoute className="w-4 h-4" />
              Explore City
            </button>

            <button
              onClick={detectLocation}
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold px-6 py-4 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaLocationArrow className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" />
              {loadingLocation ? "Detecting..." : "Use My Location"}
            </button>
          </div>

          {/* Quick Select Cities Row */}
          <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
            <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Popular:</span>
            {["Kolkata", "Delhi", "Mumbai", "Goa", "Jaipur", "Agra", "Darjeeling", "Varanasi", "Srinagar", "Amritsar"].map(cityName => (
              <button 
                key={cityName}
                onClick={() => searchLocation(cityName)}
                className="px-4 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-blue-50 dark:hover:bg-slate-700 hover:border-blue-200 dark:hover:border-slate-600 transition shadow-xs cursor-pointer"
              >
                {cityName}
              </button>
            ))}
          </div>
        </div>

        {/* Layout */}
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Places grid container */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6">
              
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  Nearby Attractions
                </h2>
                
                {places.length > 0 && (
                  <span className="text-xs font-bold bg-blue-100/60 dark:bg-slate-800 text-blue-700 dark:text-slate-400 px-3 py-1 rounded-md">
                    Found {places.length} places
                  </span>
                )}
              </div>

              {places.length === 0 ? (
                <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-16 text-center">
                  <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4">
                    <FaMapMarkerAlt className="text-2xl text-blue-500" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">No city selected yet</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                    Type a city name above or select one from our popular suggestions list to discover local attractions.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {places.map(place => {
                    const selected = selectedPlaces.find(p => p.id === place.id);

                    return (
                      <div
                        key={place.id}
                        onClick={() => togglePlace(place)}
                        className={`group relative cursor-pointer border rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5
                          ${selected
                            ? "border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/10 bg-blue-50/20 dark:bg-blue-950/10"
                            : "border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-800/90"
                          }
                        `}
                      >
                        {/* Selector checkmark */}
                        <div className={`absolute top-3 right-3 z-10 w-6 h-6 rounded-full flex items-center justify-center border shadow-md transition-all duration-300
                          ${selected 
                            ? "bg-blue-600 border-blue-600 text-white scale-100" 
                            : "bg-white/90 border-slate-200 text-slate-400 scale-0 group-hover:scale-90"
                          }
                        `}>
                          <FaCheck className="w-2.5 h-2.5" />
                        </div>

                        {/* Image wrapper */}
                        <div className="relative h-48 w-full overflow-hidden">
                          <img
                            src={place.img}
                            alt={place.name}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>

                        <div className="p-4">
                          <h3 className="font-bold text-slate-800 dark:text-white text-base tracking-tight transition-colors">
                            {place.name}
                          </h3>

                          <div className="flex gap-3 mt-3">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 dark:bg-slate-700 text-blue-700 dark:text-slate-300 border border-blue-100/40 dark:border-slate-600/30">
                              <FaMapMarkerAlt className="w-2.5 h-2.5 text-blue-500" />
                              {place.distance} km
                            </span>

                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-100/40 dark:border-amber-900/20">
                              <FaStar className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
                              {place.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Planner Panel */}
          <div className="space-y-6">

            {/* Generator Card */}
            <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                Route Builder
              </h3>
              
              <button
                onClick={generatePlan}
                disabled={selectedPlaces.length === 0}
                className={`w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer
                  ${selectedPlaces.length === 0 
                    ? "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none" 
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/10 hover:shadow-lg hover:shadow-indigo-500/20 active:scale-98"
                  }
                `}
              >
                <FaRoute className="w-4 h-4" />
                Generate Plan
              </button>

              <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-800/50">
                <span>Selected Attractions:</span>
                <span className="bg-blue-100 dark:bg-slate-800 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded">
                  {selectedPlaces.length}
                </span>
              </div>
            </div>

            {/* Timeline Plan Block */}
            {plan && (
              <div className="bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/60 dark:border-slate-800/60 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.03)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.25)] p-6 animate-fadeIn">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-6 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  Generated Itinerary
                </h2>

                {/* Timeline Path */}
                <div className="space-y-6">

                  {/* Morning Block */}
                  {plan.morning.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mb-3">
                        <FaSun className="text-amber-500 w-3.5 h-3.5" />
                        Morning Session
                      </h3>
                      
                      <div className="relative border-l-2 border-dashed border-blue-200 dark:border-slate-800 ml-2 pl-5 space-y-4">
                        {plan.morning.map((p, idx) => (
                          <div key={p.id} className="relative group/item">
                            <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-blue-600 border-2 border-white dark:border-slate-950 shadow-sm" />
                            <div className="bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                              <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 mr-1.5 uppercase">Stop {idx + 1}</span>
                              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 inline">{p.name}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Afternoon Block */}
                  {plan.afternoon.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5 mb-3">
                        <FaCloudSun className="text-blue-500 w-3.5 h-3.5" />
                        Afternoon Session
                      </h3>
                      
                      <div className="relative border-l-2 border-dashed border-blue-200 dark:border-slate-800 ml-2 pl-5 space-y-4">
                        {plan.afternoon.map((p, idx) => (
                          <div key={p.id} className="relative group/item">
                            <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-indigo-500 border-2 border-white dark:border-slate-950 shadow-sm" />
                            <div className="bg-white/60 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/60 p-3 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
                              <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 mr-1.5 uppercase">Stop {idx + plan.morning.length + 1}</span>
                              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 inline">{p.name}</h4>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* Metrics */}
                <div className="border-t border-slate-200/50 dark:border-slate-800/50 mt-6 pt-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-500">EST. TOTAL DISTANCE</span>
                    <span className="text-sm font-black text-slate-800 dark:text-slate-200">
                      {plan.totalDistance.toFixed(1)} km
                    </span>
                  </div>

                  {/* Progress distance bar */}
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500" 
                      style={{ width: `${Math.min((plan.totalDistance / 25) * 100, 100)}%` }} 
                    />
                  </div>

                  <button
                    onClick={() => setShowDirectionsModal(true)}
                    className="w-full mt-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold py-3.5 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <FaDirections className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    View Driving Directions
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Driving Directions Roadmap Modal */}
      {showDirectionsModal && plan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            onClick={() => setShowDirectionsModal(false)}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-md transition-opacity"
          />
          
          {/* Content box */}
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl max-w-lg w-full max-h-[85vh] flex flex-col overflow-hidden animate-scaleUp z-10">
            
            {/* Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                  <FaDirections className="text-blue-500 w-5 h-5 animate-bounce" />
                  AI Driving Roadmap
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Optimized route for your selected attractions in {location.charAt(0).toUpperCase() + location.slice(1)}
                </p>
              </div>
              <button 
                onClick={() => setShowDirectionsModal(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable roadmap content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Stepper container */}
              <div className="relative border-l-2 border-dashed border-blue-500/30 dark:border-slate-800 ml-4 pl-6 space-y-8 my-2">
                
                {/* Join all morning and afternoon stops in a single list */}
                {[...plan.morning, ...plan.afternoon].map((p, idx, arr) => {
                  const isLast = idx === arr.length - 1;
                  // Mock driving info between stops
                  const driveDistance = (2.5 + Math.random() * 4).toFixed(1);
                  const driveTime = Math.round(driveDistance * 3.5);
                  
                  return (
                    <div key={p.id} className="relative">
                      
                      {/* Circle Node */}
                      <div className="absolute -left-[32px] top-1.5 w-[14px] h-[14px] rounded-full bg-blue-600 border-2 border-white dark:border-slate-900 shadow-sm flex items-center justify-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>

                      <div>
                        <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest block mb-0.5">Stop {idx + 1}</span>
                        <h4 className="font-bold text-slate-800 dark:text-white text-sm tracking-tight">{p.name}</h4>
                      </div>

                      {/* Connection driving instruction */}
                      {!isLast && (
                        <div className="mt-4 p-3 rounded-lg bg-blue-50/40 dark:bg-slate-800/20 border border-blue-100/20 dark:border-slate-800/40 text-xs text-slate-600 dark:text-slate-400 space-y-1">
                          <div className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                            <FaDirections className="w-3 h-3" />
                            Drive {driveDistance} km ({driveTime} mins)
                          </div>
                          <p>Head north toward central road, turn right and continue straight for {driveDistance} km. Your destination will be on the left.</p>
                        </div>
                      )}
                    </div>
                  );
                })}
                
              </div>

            </div>

            {/* Footer */}
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3 bg-slate-50/50 dark:bg-slate-900/50">
              <button
                onClick={handleOpenGoogleMaps}
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/10 hover:shadow-lg hover:shadow-indigo-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <FaRoute className="w-4 h-4" />
                Open in Google Maps
              </button>
              <button
                onClick={() => setShowDirectionsModal(false)}
                className="px-6 py-3.5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default TourPlanPage;