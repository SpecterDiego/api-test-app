import { Text, View, StyleSheet, Image, FlatList } from "react-native";
import { mainStyles } from "../style/mainstyle";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface NasaPost {
  id: number;
  date: string;
  link: string;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: {
      source_url: string;
    }[];
  };
}

export default function NASA() {
  const [posts, setPosts] = useState<NasaPost[]>([]);
  const [loading, setLoading] = useState(false);

  async function getPosts() {
    setLoading(true);

    try {
      const response = await fetch(
        "https://www.nasa.gov/wp-json/wp/v2/posts?per_page=9&_embed",
      );

      const json: NasaPost[] = await response.json();
      console.log(json.length);

      setPosts(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  function stripHtml(html: string) {
    return html.replace(/<[^>]*>/g, "");
  }

  return (
    <SafeAreaView style={mainStyles.container}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/NASA-Logo.png")}
          style={styles.logo}
        />

        <Text style={styles.headerTitle}>Noticias NASA</Text>
      </View>

      {loading && <Text style={mainStyles.text}>Cargando...</Text>}

      {posts && (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              {item._embedded?.["wp:featuredmedia"]?.[0] && (
                <Image
                  source={{
                    uri: item._embedded["wp:featuredmedia"][0].source_url,
                  }}
                  style={styles.postImage}
                />
              )}

              <Text style={styles.title}>{stripHtml(item.title.rendered)}</Text>

              <Text style={styles.date}>
                {new Date(item.date).toLocaleDateString()}
              </Text>

              <Text style={styles.excerpt}>
                {stripHtml(item.excerpt.rendered)}
              </Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  logo: {
    height: 70,
    width: 80,
    marginRight: 10,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },

  card: {
    backgroundColor: "white",
    margin: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 3,
  },

  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
  },

  date: {
    color: "gray",
    marginVertical: 5,
  },

  excerpt: {
    fontSize: 14,
  },
});
