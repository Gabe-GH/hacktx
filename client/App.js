import { Asset } from "expo-asset";
import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  Button,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-web";
import List from "./List";
import SearchBar from "./SearchBar";

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHideAsync().catch(() => {
  /* reloading the app might trigger some race conditions, ignore them */
});

export default function App() {
  return (
    <AnimatedAppLoader image={{ uri: Constants.manifest.splash.image }}>
      <MainScreen />
    </AnimatedAppLoader>
  );
}

function AnimatedAppLoader({ children, image }) {
  const [isSplashReady, setSplashReady] = useState(false);
  console.disableYellowBox = true;

  useEffect(() => {
    async function prepare() {
      await Asset.fromURI(image.uri).downloadAsync();
      setSplashReady(true);
    }

    prepare();
  }, [image]);

  if (!isSplashReady) {
    return null;
  }

  return <AnimatedSplashScreen image={image}>{children}</AnimatedSplashScreen>;
}

function AnimatedSplashScreen({ children, image }) {
  const animation = useMemo(() => new Animated.Value(1), []);

  const [isAppReady, setAppReady] = useState(false);
  const [isSplashAnimationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => setAnimationComplete(true));
    }
  }, [isAppReady]);

  const onImageLoaded = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
      // Load stuff
      await Promise.all([]);
    } catch (e) {
      // handle errors
    } finally {
      setAppReady(true);
    }
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady && children}
      {!isSplashAnimationComplete && (
        <Animated.View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: Constants.manifest.splash.backgroundColor,
              opacity: animation,
            },
          ]}
        >
          <Animated.Image
            style={{
              width: "100%",
              height: "100%",
              resizeMode: Constants.manifest.splash.resizeMode || "contain",
              transform: [
                {
                  scale: animation,
                },
              ],
            }}
            source={image}
            onLoadEnd={onImageLoaded}
            fadeDuration={0}
          />
        </Animated.View>
      )}
    </View>
  );
}

function MainScreen() {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [fakeData, setFakeData] = useState();
  // useEffect(() => {
  //   const getData = async () => {
  //     const apiResponse = await fetch(
  //       "http://localhost:3000/chandra-dasari-cs"
  //     );
  //     const data = await apiResponse.json();
  //     console.log(data)
  //     setFakeData(data);
  //   };
  //   getData();
  // }, []);

    const onReloadPress = async () => {
      console.log(`http://localhost:3000/${searchPhrase}`)
      const apiResponse = await fetch(
        `http://localhost:3000/${searchPhrase}`
      );
      const data = await apiResponse.json();
      console.log(data)
      setFakeData(data);
    };


  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          backgroundColor: "plum",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          paddingBottom: 600
        }}
      >
        <Image source={require("./assets/icon.png")} style={{
          width: "100%",
          height: "50%",
          marginBottom: 15,
          paddingBottom:"30%"
        }}  /> 
        <Text
          style={{
            color: "black",
            fontSize: 30,
            marginBottom: 15,
            fontWeight: "bold",
          }}
        >
          Sus Detector
        </Text>

        <SearchBar
          searchPhrase={searchPhrase}
          setSearchPhrase={setSearchPhrase}
          clicked={clicked}
          setClicked={setClicked}
          fakeData={fakeData}
          setFakeData = {setFakeData}
        />
        {fakeData && searchPhrase ? (
        <List
          searchPhrase={searchPhrase}
          data={fakeData.projects}
          setClicked={setClicked}
        />
      ) : (
        <Text>you are not sussy baka... yet!</Text>
      )}
        {/* <List
          searchPhrase={searchPhrase}
          data={fakeData}
          setClicked={setClicked}
        /> */}

        <Button title="Sus me up" onPress={onReloadPress} />
      </View>

      </ScrollView>

  );
}
