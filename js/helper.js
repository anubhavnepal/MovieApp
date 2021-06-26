export async function getRes(url, err = "Something went wrong") {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${err} (${res.status})`);
    return await res.json();
  } catch (err) {
    throw err;
  }
}
