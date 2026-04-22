import { Image } from "expo-image";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CATEGORIES = ["Tutti", "AI Tools", "Design", "Dev", "Video", "Music"];

const TRENDING_CREATORS = [
  {
    id: "1",
    name: "Ovixis",
    handle: "@ovixis",
    tool: "Claude · Adobe",
    category: "AI Tools",
    followers: "12.4K",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    color: "#FF6B00",
  },
  {
    id: "2",
    name: "Sara Design",
    handle: "@saradesign",
    tool: "Figma · Midjourney",
    category: "Design",
    followers: "8.2K",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    color: "#7C3AED",
  },
  {
    id: "3",
    name: "Marco Dev",
    handle: "@marcodev",
    tool: "GitHub Copilot · Cursor",
    category: "Dev",
    followers: "21K",
    photo:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    color: "#0EA5E9",
  },
];

const RECOMMENDED = [
  {
    id: "4",
    name: "Luna Video",
    handle: "@lunavideo",
    tool: "Runway · ElevenLabs",
    photo:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
  },
  {
    id: "5",
    name: "Alex Music",
    handle: "@alexmusic",
    tool: "Suno · Udio",
    photo:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
  },
];

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Benvenuto 👋</Text>
          <Text style={styles.title}>Scopri i creatori</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>O</Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍  Cerca creatori..."
          placeholderTextColor="rgba(255,255,255,0.3)"
        />
      </View>

      {/* Categorie */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categoriesContent}
      >
        {CATEGORIES.map((cat, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.pill, i === 0 && styles.pillActive]}
          >
            <Text style={[styles.pillText, i === 0 && styles.pillTextActive]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Trending */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Trending Creators</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Vedi tutti</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.trendingScroll}
      >
        {TRENDING_CREATORS.map((creator) => (
          <TouchableOpacity key={creator.id} style={styles.trendingCard}>
            <Image
              source={{ uri: creator.photo }}
              style={styles.trendingPhoto}
              contentFit="cover"
            />
            <View
              style={[
                styles.trendingOverlay,
                { backgroundColor: creator.color + "33" },
              ]}
            />
            <View style={styles.trendingInfo}>
              <View
                style={[
                  styles.categoryBadge,
                  { backgroundColor: creator.color },
                ]}
              >
                <Text style={styles.categoryBadgeText}>{creator.category}</Text>
              </View>
              <Text style={styles.trendingName}>{creator.name}</Text>
              <Text style={styles.trendingTool}>{creator.tool}</Text>
              <Text style={styles.trendingFollowers}>
                {creator.followers} followers
              </Text>
              <TouchableOpacity
                style={[styles.fuelButton, { backgroundColor: creator.color }]}
              >
                <Text style={styles.fuelButtonText}>⛽ Fai il pieno</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Recommended */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Consigliati</Text>
        <TouchableOpacity>
          <Text style={styles.seeAll}>Vedi tutti</Text>
        </TouchableOpacity>
      </View>

      {RECOMMENDED.map((creator) => (
        <TouchableOpacity key={creator.id} style={styles.recommendedCard}>
          <Image
            source={{ uri: creator.photo }}
            style={styles.recommendedPhoto}
            contentFit="cover"
          />
          <View style={styles.recommendedInfo}>
            <Text style={styles.recommendedName}>{creator.name}</Text>
            <Text style={styles.recommendedHandle}>{creator.handle}</Text>
            <Text style={styles.recommendedTool}>{creator.tool}</Text>
          </View>
          <TouchableOpacity style={styles.fuelButtonSmall}>
            <Text style={styles.fuelButtonSmallText}>⛽</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      <View style={styles.bottomPadding} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 60,
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
    color: "rgba(255,255,255,0.4)",
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  searchContainer: {
    marginBottom: 20,
  },
  searchInput: {
    backgroundColor: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 14,
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  categoriesScroll: {
    marginBottom: 28,
  },
  categoriesContent: {
    gap: 8,
    paddingRight: 20,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  pillActive: {
    backgroundColor: "#FF6B00",
    borderColor: "#FF6B00",
  },
  pillText: {
    fontSize: 13,
    color: "rgba(255,255,255,0.5)",
    fontWeight: "500",
  },
  pillTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  seeAll: {
    fontSize: 13,
    color: "#FF6B00",
    fontWeight: "600",
  },
  trendingScroll: {
    gap: 12,
    paddingRight: 20,
    marginBottom: 32,
  },
  trendingCard: {
    width: 220,
    height: 300,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#1A1A1A",
  },
  trendingPhoto: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  trendingOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  trendingInfo: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    gap: 4,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  categoryBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  trendingName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFFFFF",
  },
  trendingTool: {
    fontSize: 12,
    color: "rgba(255,255,255,0.7)",
  },
  trendingFollowers: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
    marginBottom: 8,
  },
  fuelButton: {
    borderRadius: 10,
    paddingVertical: 8,
    alignItems: "center",
  },
  fuelButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 13,
  },
  recommendedCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    gap: 12,
  },
  recommendedPhoto: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  recommendedInfo: {
    flex: 1,
    gap: 2,
  },
  recommendedName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  recommendedHandle: {
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
  },
  recommendedTool: {
    fontSize: 12,
    color: "rgba(255,255,255,0.5)",
  },
  fuelButtonSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF6B00",
    justifyContent: "center",
    alignItems: "center",
  },
  fuelButtonSmallText: {
    fontSize: 18,
  },
  bottomPadding: {
    height: 40,
  },
});
