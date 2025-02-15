import { ScrollView, Text, StyleSheet, View, SafeAreaView, Image } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useRef, useState, React } from "react";
import AnimatedDotsCarousel from "react-native-animated-dots-carousel"

const { width } = Dimensions.get('window');

const images = [
  { id: '1', uri: 'https://via.placeholder.com/800x400.png?text=Image+1' },
  { id: '2', uri: 'https://via.placeholder.com/800x400.png?text=Image+2' },
  { id: '3', uri: 'https://via.placeholder.com/800x400.png?text=Image+3' },
  { id: '4', uri: 'https://via.placeholder.com/800x400.png?text=Image+4' },
  { id: '5', uri: 'https://via.placeholder.com/800x400.png?text=Image+5' },
  { id: '6', uri: 'https://via.placeholder.com/800x400.png?text=Image+6' },
  { id: '7', uri: 'https://via.placeholder.com/800x400.png?text=Image+7' },
  { id: '8', uri: 'https://via.placeholder.com/800x400.png?text=Image+8' },
  { id: '9', uri: 'https://via.placeholder.com/800x400.png?text=Image+9' },
  { id: '10', uri: 'https://via.placeholder.com/800x400.png?text=Image+10' },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const scrollViewRef = React.useRef(null);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const finalIndex = Math.floor(contentOffsetX / width);
    setIndex(finalIndex);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{
            width: '100%',
            height: 300,
          }}
        >
          {images.map((image) => (
            <View
              key={image.id}
              style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                source={{ uri: image.uri }}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'cover',
                }}
              />
            </View>
          ))}
        </ScrollView>
        <View style={{ marginTop: 20 }}>
          <AnimatedDotsCarousel
            length={images.length}
            scrollableDotsConfig={{
              setIndex,
              onNewIndex: (newIndex) => {
                scrollViewRef?.current?.scrollTo?.({
                  x: newIndex * width,
                  animated: false,
                });
              },
              containerBackgroundColor: 'rgba(230,230,230, 0.5)',
              container: {
                alignItems: 'center',
                borderRadius: 15,
                height: 30,
                justifyContent: 'center',
                paddingHorizontal: 15,
               }
            }}
            currentIndex={index}
            maxIndicators={4}
            interpolateOpacityAndColor={true}
            activeIndicatorConfig={{
              color: 'red',
              margin: 3,
              opacity: 1,
              size: 8,
            }}
            inactiveIndicatorConfig={{
              color: 'white',
              margin: 3,
              opacity: 0.5,
              size: 8,
            }}
            decreasingDots={[
              {
                config: { color: 'white', margin: 3, opacity: 0.5, size: 6 },
                quantity: 1,
              },
              {
                config: { color: 'white', margin: 3, opacity: 0.5, size: 4 },
                quantity: 1,
              },
            ]}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
});