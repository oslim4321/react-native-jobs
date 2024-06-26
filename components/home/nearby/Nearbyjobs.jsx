import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import styles from "./nearbyjobs.style";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { COLORS } from "../../../constants";
import { useFetch } from "../../../hooks/useFetch";
import { useRouter } from "expo-router";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isLoading, error, refresh } = useFetch("search", {
    query: "React Developer",
    num_pages: 1,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
        <TouchableOpacity>
          <Text
            onPress={() => router.push("/popular_job_list")}
            style={styles.headerBtn}
          >
            Show All
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ) : error ? (
          <Text>Something Went Wrong</Text>
        ) : (
          data?.map((job) => (
            <NearbyJobCard
              job={job}
              key={`nearby_job-${job?.job_id}`}
              handleNavigate={() => router.push(`/job_details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
