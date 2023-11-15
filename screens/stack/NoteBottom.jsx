import React, { useCallback, useMemo, useRef } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { COLORS } from "../../constants";
import Notification from "./Notification";

const NoteBottom = () => {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const bottomSheetRef = useRef(null);

  const handleClosePress = () => {
    bottomSheetRef.current.close();
  };
  const handleOpenPress = (index) => {
    bottomSheetRef.current.snapToIndex(index);
  };

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Button title="Close" onPress={() => handleClosePress()} />
      <Button title="Open" onPress={() => handleOpenPress(0)} />

      <Notification />

      <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}
        enablePanDownToClose={false}
        backdropComponent={renderBackdrop}
        backgroundStyle={{backgroundColor: COLORS.appBackground}}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet>
    </View>
  );
};

export default NoteBottom;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
