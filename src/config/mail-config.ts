class MailConfig {
  public host = process.env.MAIL_HOST;
  public port = process.env.MAIL_PORT;
  public user = process.env.MY_EMAIL;
  public password = process.env.MY_PASSWORD;
}

export default new MailConfig;
