export const GET = async (req: Request) => {
  try {
    return new Response("well, it works!", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("something went wrong !", { status: 500 });
  }
};
