export default new class GQL {
  private graphURL: string;
  private tokenLong: string;

  constructor() {
    this.SetAuthToken();

    this.graphURL = `https://${window.location.href.replace("https://", "").split("/")[0]}/graphql/us`;
  }
  private SetAuthToken() {
    let cookie = document.cookie.split("; ").find(cookie => /\[Token\]\[Long\]/i.test(cookie));
    this.tokenLong = cookie?.split("=")?.pop();
  }

  private async GQL(
    query: string, 
    variables?
  ) {
    return await fetch(this.graphURL, {
      method: "POST",
      body: JSON.stringify({ query, variables }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "X-B-Token-Long": this.tokenLong
      }
    }).then(data => data.json());
  }

  async ForYou(id: string | number) {
    return this.GQL(
      `query($id:ID!){
        user(id:$id){
          answers{
            edges{
              node{
                question{
                  similar{
                    question{
                      content 
                      id
                      pointsForAnswer
                      attachments{
                        url
                      }
                      canBeAnswered
                      subject{
                        name
                        icon
                      }
                      author{
                        id
                        avatar{
                          thumbnailUrl
                        }
                      }
                      answers{
                        nodes{
                          author{
                            nick
                            id
                          }
                        }
                      }
                    }
                    similarity
                  }
                }
              }
            }
          }
        }
      }`, { "id":btoa(`user:${id}`) }
    );
  }
};