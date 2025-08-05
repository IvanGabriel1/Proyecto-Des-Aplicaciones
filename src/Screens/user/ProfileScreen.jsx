import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { colors } from "../../global/colors";
import CameraIcon from "../../components/CameraIcon";
import { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import { useSelector, useDispatch } from "react-redux";
import { usePutProfilePictureMutation } from "../../services/user/userApi";
import { setProfilePicture } from "../../features/user/userSlice";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const ProfileScreen = () => {
  const user = useSelector((state) => state.userReducer.userEmail);
  const localId = useSelector((state) => state.userReducer.localId);
  const image = useSelector((state) => state.userReducer.profilePicture);
  const [triggerPutProfilePicture] = usePutProfilePictureMutation();
  const [location, setLocation] = useState(null);
  const [locationLoaded, setLocationLoaded] = useState(false);
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: true,
    });

    if (!result.canceled) {
      const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
      dispatch(setProfilePicture(imgBase64));
      triggerPutProfilePicture({ localId: localId, image: imgBase64 });
    }
  };

  useEffect(() => {
    async function getCurrentLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          //console.log("Permiso denegado para ubicación.");
          setLocationLoaded(true);
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        if (location) {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${process.env.EXPO_PUBLIC_GMAPS_API_KEY}`
          );
          const data = await response.json();
          setAddress(data.results[0]?.formatted_address || "");
          setLocation(location);
        }
      } catch (error) {
        // console.log("Error al obtener ubicación:", error);
      } finally {
        setLocationLoaded(true);
      }
    }

    getCurrentLocation();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imagePlaceholder}>
            {user.charAt(0).toUpperCase()}
          </Text>
        )}
        <Pressable onPress={pickImage} style={styles.cameraIcon}>
          <CameraIcon />
        </Pressable>
      </View>

      <Text style={styles.emailText}>{user}</Text>

      <Text style={styles.sectionTitle}>Mi ubicación</Text>

      <View style={styles.mapWrapper}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"Tu ubicación"}
            />
          </MapView>
        ) : locationLoaded ? (
          <Text style={styles.errorText}>No se pudo obtener ubicación</Text>
        ) : (
          <ActivityIndicator size="large" color={colors.primary} />
        )}
      </View>

      {address ? (
        <View style={styles.addressBox}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    backgroundColor: "#fdfdfd",
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.primary,
    marginBottom: 16,
    position: "relative",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  emailText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  mapWrapper: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 16,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  addressBox: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  addressText: {
    fontSize: 14,

    textAlign: "center",
  },
  errorText: {
    fontSize: 14,
    color: "red",
    textAlign: "center",
    padding: 12,
  },
  imagePlaceholder: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 48,
    color: "white",
    fontWeight: "bold",
  },
});
