import { useEffect, useRef, useState } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";
import Svg, { Circle, Text as SvgText } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const CIRCLE_RADIUS = width * 0.35;
const CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function HomeScreen() {
  const [showHome, setShowHome] = useState(false);

  // Cerchio che si disegna
  const strokeProgress = useRef(new Animated.Value(0)).current;

  // Particelle geometriche
  const particle1 = useRef(new Animated.Value(0)).current;
  const particle2 = useRef(new Animated.Value(0)).current;
  const particle3 = useRef(new Animated.Value(0)).current;

  // Logo
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;

  // Tagline
  const taglineOpacity = useRef(new Animated.Value(0)).current;

  // Glow pulsante
  const glowScale = useRef(new Animated.Value(0.95)).current;
  const glowOpacity = useRef(new Animated.Value(0.06)).current;

  // Fade out finale
  const splashOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // 1. Cerchio si disegna progressivamente
    Animated.timing(strokeProgress, {
      toValue: 1,
      duration: 1800,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();

    // 2. Particelle geometriche appaiono
    Animated.stagger(200, [
      Animated.timing(particle1, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(particle2, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(particle3, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    // 3. Logo appare dopo che il cerchio è quasi completo
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }, 1400);

    // 4. Tagline
    setTimeout(() => {
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }, 2000);

    // 5. Glow pulsa in loop
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 1.08,
            duration: 2200,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.13,
            duration: 2200,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(glowScale, {
            toValue: 0.95,
            duration: 2200,
            useNativeDriver: true,
          }),
          Animated.timing(glowOpacity, {
            toValue: 0.04,
            duration: 2200,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ).start();

    // 6. Fade out e Home
    setTimeout(() => {
      Animated.timing(splashOpacity, {
        toValue: 0,
        duration: 900,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => setShowHome(true));
    }, 4500);
  }, []);

  const strokeDashoffset = strokeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE, 0],
  });

  if (!showHome) {
    return (
      <Animated.View style={[styles.splash, { opacity: splashOpacity }]}>
        {/* Glow di fondo pulsante */}
        <Animated.View
          style={[
            styles.glow,
            {
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        />

        {/* SVG — cerchio che si disegna + logo dentro */}
        <Svg width={width} height={width} style={styles.svgContainer}>
          {/* Traccia di fondo del cerchio */}
          <Circle
            cx={width / 2}
            cy={width / 2}
            r={CIRCLE_RADIUS}
            stroke="rgba(255, 107, 0, 0.08)"
            strokeWidth={1}
            fill="none"
          />

          {/* Cerchio animato che si disegna */}
          <AnimatedCircle
            cx={width / 2}
            cy={width / 2}
            r={CIRCLE_RADIUS}
            stroke="#FF6B00"
            strokeWidth={1.5}
            fill="none"
            strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            rotation="-90"
            origin={`${width / 2}, ${width / 2}`}
          />

          {/* Logo FUELO dentro il cerchio */}
          <SvgText
            x={width / 2}
            y={width / 2 + 18}
            textAnchor="middle"
            fontSize="52"
            fontWeight="800"
            fill="white"
            letterSpacing="6"
          >
            FUELO
          </SvgText>
        </Svg>

        {/* Particelle geometriche */}
        <Animated.View
          style={[
            styles.particle,
            styles.particle1,
            { opacity: particle1, transform: [{ rotate: "45deg" }] },
          ]}
        />
        <Animated.View
          style={[styles.particle, styles.particle2, { opacity: particle2 }]}
        />
        <Animated.View
          style={[
            styles.particle,
            styles.particle3,
            { opacity: particle3, transform: [{ rotate: "30deg" }] },
          ]}
        />

        {/* Tagline sotto */}
        <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
          fai il pieno ai tuoi creatori
        </Animated.Text>
      </Animated.View>
    );
  }

  return (
    <View style={styles.home}>
      <Animated.Text style={styles.homeTitle}>FUELO</Animated.Text>
      <Animated.Text style={styles.homeTagline}>
        fai il pieno ai tuoi creatori
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    backgroundColor: "#080808",
    justifyContent: "center",
    alignItems: "center",
  },
  glow: {
    position: "absolute",
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: "#FF6B00",
    top: height * 0.08,
  },
  svgContainer: {
    marginTop: -height * 0.05,
  },
  particle: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255, 107, 0, 0.3)",
  },
  particle1: {
    width: 12,
    height: 12,
    top: height * 0.18,
    left: width * 0.12,
  },
  particle2: {
    width: 8,
    height: 8,
    borderRadius: 4,
    top: height * 0.22,
    right: width * 0.1,
    backgroundColor: "rgba(255, 107, 0, 0.2)",
  },
  particle3: {
    width: 16,
    height: 16,
    bottom: height * 0.28,
    right: width * 0.14,
  },
  tagline: {
    fontSize: 11,
    color: "rgba(255, 107, 0, 0.5)",
    letterSpacing: 4,
    marginTop: -height * 0.06,
  },
  home: {
    flex: 1,
    backgroundColor: "#080808",
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  homeTitle: {
    fontSize: 48,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 8,
  },
  homeTagline: {
    fontSize: 11,
    color: "rgba(255, 107, 0, 0.5)",
    letterSpacing: 4,
  },
});
