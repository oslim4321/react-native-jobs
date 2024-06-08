import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  image,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";

import styles from "./welcome.style";
import { useRouter } from "expo-router";
import { Icons, SIZES, icons } from "../../../constants";

const Welcome = () => {
  const [activeJobType, setactiveJobType] = useState("Full-time");
  const router = useRouter();
  const jobTypes = ["Full-time", "Part-time", "Contract"];
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello OSlim</Text>
        <Text style={styles.welcomeMessage}>Find a Perfect Job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            value=""
            onChange={() => {}}
            placeholder="What Are You Looking for"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn} onPress={() => {}}>
          <Image
            source={icons.search}
            resizeMode={"contain"}
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <FlatList
          data={jobTypes}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setactiveJobType(item);
                router.push(`/search/${item}`);
              }}
              style={styles.tab(activeJobType, item)}
            >
              <Text style={styles.tabText(activeJobType, item)}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ columnGap: SIZES.small }}
          horizontal
        />
      </View>
    </View>
  );
};

export default Welcome;
