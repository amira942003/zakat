export const verifyUser = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/me/`, {
  method: "GET",
  credentials: "include", // ✅ This tells the browser to send cookies automatically
});

 
  if (!response.ok) {
    throw new Error("Unauthorized");
  }
  
  
  return response.json() ;
 
};