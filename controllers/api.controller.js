export const api = (req, res) => {
  res.json({
    message: 'Hello World',
    email: 'YourEmail@SomeAddress.com',
    data: 'Returning some JSON data',
    source: { one: 'one', two: 'two' },
    members: ['Wanda', 'Vision', 'Mephisto'],
  });
};
export const status = (req, res) => {
  res.json({
    status: 'Great',
    info: 'Status export from api.controller',
  });
};
