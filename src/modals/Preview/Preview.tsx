// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect } from "react";
import Head from "./Components/_head";
import createModal from "@lib/createModal";
import Item from "./Components/_item";
import { Legacy } from "@brainly";
import showLoading from "@lib/showLoading";

export default async function showPreview(id:string | number, modalClose?: () => void) {
  if (document.querySelector(".loading-ext#prev")) return;
  let data, dRef;
  await showLoading("Fetching Data", "prev", async () => {
    data = await Legacy.PreviewData(id);
    dRef = await Legacy.ReferenceData();
  });
  
  let subject = dRef.data.subjects.find(({ id }) => id === data.data.task.subject_id).name;
  let grade = dRef.data.grades.find(({ id }) => id === data.data.task.grade_id).name;

  createModal({
    element: (<>
      <Head subject={subject} grade={grade} id={id} data={data.data.task} />
      <div className="items scroll-container" style={{ flex:"1", overflow: "auto" }}>

        <Item id={id} users={data.users_data} data={data.data.task} type="task" />
        {data.data.responses.map(({ id }, index) => {
          return (
            <Item
              id={id}
              key={index}
              users={data.users_data}
              data={data.data.responses[index]}
              type="response" />
          );
        })}
      </div>
    </>
    ),
    className: "preview",
    minWidth: "600px",
    maxWidth: "600px",
    closeFn: () => {
      if (modalClose) modalClose(); 
    }
  });
}