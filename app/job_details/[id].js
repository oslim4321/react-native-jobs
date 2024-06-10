import { useCallback, useState } from "react";
import {
  Text,
  Viee,
  SafeAreaView,
  ActivityIndicator,
  RefreshControl,
  View,
  ScrollView,
} from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { COLORS, SIZES, icons } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";

const JobDetails = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { data, isLoading, error, refresh } = useFetch("job-details", {
    job_id: params.id,
  });

  const tabs = ["About", "Qualification", "Responsibilities"];
  const [refreshing, setrefreshing] = useState(false);
  const [activeTab, setactiveTab] = useState(tabs[0]);

  const onRefresh = useCallback(() => {
    setrefreshing(true);
    refresh();
    setrefreshing(false);
  }, []);

  function displayTabContent() {
    switch (activeTab) {
      case "Qualification":
        return (
          <Specifics
            title="Qualification"
            points={data[0].job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "About":
        return (
          <JobAbout info={data[0]?.job_description ?? "No data Provided"} />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0].job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
    }
  }
  return (
    <SafeAreaView>
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),

          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={"60%"} />
          ),
          headerTitle: "",
        }}
      />

      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator size={"large"} color={COLORS.primary} />
          ) : error ? (
            <Text>Something went wrong</Text>
          ) : (
            data && (
              <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
                <Company
                  companyLogo={data[0]?.employer_logo}
                  jobTitle={data[0]?.job_title}
                  location={data[0]?.job_country}
                  companyName={data[0]?.employer_name}
                />

                <JobTabs
                  tabs={tabs}
                  activeTab={activeTab}
                  setactiveTab={setactiveTab}
                />
                {displayTabContent()}
              </View>
            )
          )}
        </ScrollView>
        {data && (
          <JobFooter
            url={
              data[0]?.job_google_link ??
              "https:/careers.google.com/jobs/results"
            }
          />
        )}
      </>
    </SafeAreaView>
  );
};

export default JobDetails;
