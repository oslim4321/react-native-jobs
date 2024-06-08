import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

import styles from "./popularjobcard.style";

const PopularJobCard = ({ item, selectedJobs, handleCardPress }) => {
  console.log();
  return (
    <TouchableOpacity
      style={styles.container(selectedJobs)}
      onPress={() => handleCardPress(item)}
    >
      <TouchableOpacity>
        <Image
          source={{ uri: item.employer_logo }}
          resizeMode="contain"
          style={styles.logoImage}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default PopularJobCard;
