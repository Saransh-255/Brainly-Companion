import { 
  Text, 
  Accordion, 
  AccordionItem, 
  Flex, 
  Headline, 
  Link, 
  Box, 
  Button, 
  Icon 
} from "brainly-style-guide";
import { startOfDay, startOfISOWeek, startOfMonth, sub } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { formatDistance } from "date-fns";
import showPreview from "@modals/Preview/Preview";

import { distinctIds } from "@lib/arrOps";
import { Notifications } from "@typings/brainly";
import TimeFns from "@lib/timeFns";

export default function NotificationItem({ notif, time }: { notif: Notifications, time: TimeFns }) {
  let cmtNotifs = notif.data.items.filter(item => item.text.includes("commented"));

  const now = time.getNow();

  let thisDay = time.filterByTime(cmtNotifs, startOfDay(now), now);
  let thisWeek = time.filterByTime(cmtNotifs, startOfISOWeek(now), startOfDay(now));
  let thisMonth = time.filterByTime(cmtNotifs, startOfMonth(now), startOfISOWeek(now));
  let lastMonth = time.filterByTime(cmtNotifs, sub(startOfMonth(now), { months: 1 }), startOfMonth(now));
  let allVis = time.filterByTime(cmtNotifs, sub(startOfMonth(now), { months: 1 }), now);

  if (allVis.length) return (
    <Flex
      className = "comments f1"
      style = {{ minWidth:"350px" }}
    >
      <Box
        border
        color="transparent"
        padding="m"
      >
        <Accordion>
          {
            [
              {
                array: thisDay,
                id: "daily",
                title: `Today (${thisDay.length})`
              },
              {
                array: thisWeek,
                id: "weekly",
                title: `This Week (${thisWeek.length})`
              },
              {
                array: thisMonth,
                id: "monthly",
                title: `This Month (${thisMonth.length})`
              },
              {
                array: lastMonth,
                id: "last-month",
                title: `Last Month (${lastMonth.length})`
              }
            ].map(item => {
              if (item.array.length) return (
                <AccordionItem
                  id={item.id}
                  title={item.title}
                >
                  <NotifItem arr = {item.array} now={now} tz={time.tz} />
                </AccordionItem>
              );
            })
          }
        </Accordion>
      </Box>
    </Flex>
  );
}
function NotifItem({ arr, now, tz } : { arr: Notification[], now: Date, tz: string }) {
  return (<Flex style = {{ gap: "0.5rem" }} direction="column">
    {
      distinctIds(arr).map(item => {
        return (
          <Box border color="transparent" padding="s" key = {item[0].id} >
            <Flex alignItems="center">
              <Flex alignItems="center" justifyContent="space-between" style={{ width:"100%" }} >
                <Flex style = {{ gap:"1rem" }}>
                  <Headline>{ item.length }</Headline> 
                  <Flex wrap = {true} direction = "column" >
                    <Text size="small" color="text-gray-50" >
                  thread
                      <Link 
                        hideNewTabIndicator 
                        target="_blank" 
                        href = {`https://brainly.com/question/${item[0].model_id}`}> #{item[0].model_id }
                      </Link>
                    </Text>
                    <Text size="small" color="text-gray-70" style = {{ lineHeight: "1rem" }}>
                      {
                        formatDistance(
                          new Date(
                            formatInTimeZone(
                              new Date(item.at(-1).created), tz, "yyyy-MM-dd HH:mm:ss"
                            )
                          ), 
                          now,
                          {
                            includeSeconds: true, 
                            addSuffix: true
                          }
                        )
                      }
                    </Text>
                  </Flex>
                </Flex>
                <Button 
                  variant={"transparent"} 
                  icon={
                    <Icon type="seen" title="preview" color="icon-gray-50" size={24} />
                  }
                  size="m"
                  iconOnly
                  onClick={
                    () => {
                      showPreview(item[0].model_id);
                    }
                  }
                />
              </Flex>
            </Flex>
          </Box>
        );
      })
    }
  </Flex>);
}