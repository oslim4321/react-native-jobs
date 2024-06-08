import { useRouter, Stack } from "expo-router";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import {
  Popularjobs,
  Nearbyjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { COLORS, SIZES, icons, images } from "../constants";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn iconUrl={icons.menu} dimension={"60%"} />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={images.profile} dimension={"100%"} />
          ),
          headerTitle: "",
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ lex: 1, padding: SIZES.medium }}>
          <Welcome />
          <Popularjobs />
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
