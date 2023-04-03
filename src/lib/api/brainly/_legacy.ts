import type {
  CommonResponse,
  GetQuestionResponse,
  ReportData,
  ReferenceData,
  PreviewData,
  UserInfo,
  ContentList,
  Notifications
} from "@typings/brainly";

export default new class BrainlyAPI {
  private legacyURL:string;
  private tokenLong: string;
  private MODEL_ID = {
    "task" : 1,
    "response" : 2,
    "comment": 45
  };

  constructor() {
    this.SetAuthToken();

    this.legacyURL = `https://${window .location.href.replace("https://", "").split("/")[0]}/api/28`;
  }
  private SetAuthToken() {
    let cookie = document.cookie.split("; ").find(cookie => /\[Token\]\[Long\]/i.test(cookie));
    this.tokenLong = cookie?.split("=")?.pop();
  }

  private async Legacy<T>(
    method: "GET" | "POST",
    apiMethod: string,
    body?
  ): Promise<CommonResponse<T>> {
    const res = await fetch(`${this.legacyURL}/${apiMethod}`, {
      method,
      body: method === "GET" ? null : JSON.stringify(body)
    }).then(data => data.json());
      
    if (!res.success) throw Error(res.message || "error");
      
    return res;
  }

  public async GetQuestion(id: number): Promise<GetQuestionResponse> {
    return await this.Legacy("GET", `api_tasks/main_view/${id}`);
  }
  async ReportReasons(id: number, type: "task" | "response" | "comment"):Promise<ReportData> {
    return await fetch(`${this.legacyURL}/moderation_new/get_abuse_reasons`, {
      method: "POST",
      body: JSON.stringify({
        model_id: id,
        model_type_id: this.MODEL_ID[type]
      })
    }).then(data => data.json()).then(data => data);
  }
  async ReferenceData():Promise<ReferenceData> {
    return await fetch(this.legacyURL + "/api_config/desktop_view")
      .then(data => data.json());
  }
  async PreviewData(id:string | number):Promise<PreviewData> {
    return await fetch(`${this.legacyURL}/api_tasks/main_view/${id}`)
      .then(data => data.json());
  }
  async MyData():Promise<UserInfo> {
    return await fetch(`${this.legacyURL}/api/28/api_users/me`).then(data => data.json());
  }
  async GetContent(type: "tasks" | "responses"):Promise<ContentList> {
    return await fetch(`${this.legacyURL}/api_${type}/view_list`, 
      {
        method: "POST", 
        body: JSON.stringify({ 
          limit: 10000, 
          last_id: null })
      }).then(data => data.json());
  }
  async GetNotifications():Promise<Notifications> {
    return await fetch(`${this.legacyURL}/api_notifications/view`, 
      {
        method: "POST", 
        body: JSON.stringify({
          last_id: null, 
          limit: 500
        })
      }).then(data => data.json());
  }
  async ReportContent(data: {
    id: number, 
    type: "task" | "response" | "comment",
    categoryId: number,
    subId?: number,
    data?: string
  }) {

    let res = await fetch(`${this.legacyURL}/api_moderation/abuse_report`, {
      method: "POST",
      body: JSON.stringify({
        abuse: {
          category_id: data.categoryId,
          subcategory_id: data.subId ?? null,
          data: data.data ?? null
        },
        model_id: data.id,
        model_type_id: this.MODEL_ID[data.type],
      })
    }).then(data => data.json());
    return res.success ? res : null;
  }
};