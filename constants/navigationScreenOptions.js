import { Colors } from "./colors";

export const authScreenOptions = {
  headerShown: false,
  headerTintColor: "white",

  contentStyle: { backgroundColor: Colors.primary400 },
};

export const drawerScreenOptions = (title) => ({
  drawerLabel: title,
  headerStyle: { backgroundColor: Colors.primary700 },
  headerTitleStyle: { color: Colors.primary50 },
  headerTitleAlign: "center",
  title,
});
