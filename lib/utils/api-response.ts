export function success(
  data: unknown,

  status = 200,
) {
  return Response.json(
    {
      success: true,

      data,
    },

    {
      status,
    },
  );
}

export function failed(
  message: string,

  status = 400,
) {
  return Response.json(
    {
      success: false,

      message,
    },

    {
      status,
    },
  );
}
