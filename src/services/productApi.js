import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
export async function getProducts() {
  const Collection = collection(db, "products");
  const data = await getDocs(Collection);
  return data.docs.map((docs) => ({ ...docs.data() }));
}
