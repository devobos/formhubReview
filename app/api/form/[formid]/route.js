import querystring from "querystring";
import { collection, getDoc, addDoc, doc } from "firebase/firestore";
import { db } from "../../../../firebase";

export async function POST(request, { params }) {
  const formid = params.formid;
  const handleSubmit = async (data) => {
    const docRef = doc(db, "forms", formid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await addDoc(collection(db, "submissions"), {
        formId: formid,
        data: data,
      });
      console.log("data added");
    } else {
      console.log("No such document!");
      return new Response({
        status: 500,
      });
    }
  };

  const res = await request.text();
  const parsedData = querystring.parse(res); // Parse the URL-encoded data
  const data = Object.assign({}, parsedData);
  handleSubmit(data);

  console.log(formid);
  console.log(data);
}
