import {Component, Input, OnInit} from '@angular/core';
import {AppointmentEvent} from "./model/appointmentEvent";
import {GroupEvent} from "./model/groupEvent";

@Component({
  selector: 'scheduler-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
})
export class SchedulerComponent implements OnInit {

  @Input() intervalInMinutes = 60;
  @Input() startDateTime = new Date("2023-07-30T00:00:00");
  @Input() endDateTime = new Date("2023-07-31T00:00:00");
  @Input() intervals = this.getIntervals();
  @Input() events: AppointmentEvent[] = [];
  @Input() column ={name:"MAIN ROOM"}
  @Input() allDay = "All day";
  @Input() mobileView = true;
  @Input() locale = 'en-US';

  TODAY=new Date();
  options :Intl.DateTimeFormatOptions = {day:"2-digit",month:"short",year:"numeric"}

  groupEvents: GroupEvent[] = [];

  getIntervals(): string[] {
    const intervals = [];
    const dateTime = new Date(this.startDateTime);
    const startDate = this.startDateTime.getDate();

    while (dateTime.getDate() === startDate) {
      intervals.push(
        dateTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2}) +
        ":" +
        dateTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2})
      );
      dateTime.setMinutes(dateTime.getMinutes() + this.intervalInMinutes);
    }

    return intervals;
  }

  ngOnInit(): void {

    this.events = [{
      title: "Date with Stranger",
      startTime: new Date("2023-07-30T20:00:00"),
      length: 60,
      priority: "low",
      contact: "MK"
    },
      {
        title: "Date with Joker",
        startTime: new Date("2023-07-30T09:00:00"),
        length: 120,
        priority: "medium",
        contact: "GK"
      },
      {
        title: "Doctor's appointment",
        startTime: new Date("2023-07-30T08:00:00"),
        length: 90,
        priority: "medium",
        contact: "LK"
      },
      {
        title: "Katya's play time",
        startTime: new Date("2023-07-30T07:00:00"),
        length: 300,
        priority: "medium",
        contact: "LK"
      },
      {
        title: "Jackie",
        startTime: new Date("2023-07-30T14:00:00"),
        length: 60,
        priority: "medium",
        contact: "LK"
      },
      {
        title: "Jay Jay ",
        startTime: new Date("2023-07-30T15:00:00"),
        length: 60,
        priority: "medium",
        contact: "LK"
      },
      {
        title: "May Jay ",
        startTime: new Date("2023-07-30T15:00:00"),
        length: 60,
        priority: "high",
        contact: "LK"
      },
      {
        title: "mahesh's play time",
        startTime: new Date("2023-07-30T08:00:00"),
        length: 60,
        priority: "medium",
        contact: "LK"
      }
    ];

    this.sortEvents();
    this.setGroupEvents();

    console.log(this.groupEvents);
  }

  sortEvents() {
    this.events.sort(
      (a, b) => {
        return a.startTime!.getTime() - b.startTime!.getTime();
      }
    )
  }

  getEventHeight(length: number | undefined) {
    if (length === undefined) return "4em";
    const multiplier = length / this.intervalInMinutes;
    return (multiplier * 4) + "em";
  }

  getOffsetforEvent(startTimeEvent: Date | undefined) {
    if (startTimeEvent === undefined || startTimeEvent < this.startDateTime) return 4;
    let offsetMultiplier = startTimeEvent.getTime() - this.startDateTime.getTime();
    offsetMultiplier = offsetMultiplier / (1000 * 60);
    offsetMultiplier = offsetMultiplier / this.intervalInMinutes;
    return (offsetMultiplier*4)+8;
  }

  getColor(priority: string | undefined) {
    switch (priority) {
      case "high":
        return "rgba(255,97,71,0.3)";
      case "medium":
        return "rgb(123, 222, 131,0.3)";
      case "low":
        return "rgb(215, 190, 13,0.3)";
      default:
        return "blue";
    }
  }

  getTouchColor(priority: string | undefined) {
    switch (priority) {
      case "high":
        return "rgba(255,97,71)";
      case "medium":
        return "rgb(123, 222, 131)";
      case "low":
        return "rgb(215, 190, 13)";
      default:
        return "blue";
    }
  }


  private pushNewGroup(e: AppointmentEvent,originalIndex:number) {
    this.groupEvents.push({
      offset: this.getOffsetforEvent(e.startTime!),
      events: [{...e, originalIndex: originalIndex}],
      startTime: e.startTime!,
      endTime: new Date(e.startTime!.getTime() + e.length! * 60 * 1000)
    });
  }

  private pushEventToGroup(e: AppointmentEvent,originalIndex:number,groupIndex:number) {
    this.groupEvents[groupIndex].events?.push({...e,originalIndex:originalIndex});
    const possibleEndTime = new Date(e.startTime!.getTime() + e.length! * 60 * 1000);
    this.groupEvents[groupIndex].endTime = this.groupEvents[groupIndex].endTime! > possibleEndTime ? this.groupEvents[groupIndex].endTime! : possibleEndTime;
  }


  private setGroupEvents() {

    //first push to group
    this.events[0].offset = 0;
    this.pushNewGroup(this.events[0],0);
    let groupIndex = 0;

    this.events.forEach((e, index) => {

      if (index !== 0) {
        //check if it conflicts
        if (e.startTime! < this.groupEvents[groupIndex].endTime!) {

          e.offset = this.getOffsetforEvent(e.startTime!) - this.groupEvents[groupIndex].offset!;
          this.pushEventToGroup(e,index,groupIndex);
        } else {
          e.offset = 0; // offset is 0 for the first event pushed to group
          this.pushNewGroup(e,index)
          groupIndex++;
        }
      }
    });
  }

  getOffsetString(offset: number | undefined,groupOffset:number|undefined) {
    return offset! + groupOffset! + "em";
  }

  getWidth(length: any | undefined) {
    return 100 / length! + "%";
  }

  getGroupHeight(group: any | undefined) {
    return this.getEventHeight((group.endTime!.getTime() - group.startTime!.getTime()) / (1000 * 60));

  }

  getLeft(length: any | undefined, i: number | undefined) {
    return i! * (100 / length!) + 8 +"%";
  }

  eventDrag(ev:DragEvent,index:number|undefined) {
    ev.dataTransfer?.setData("id",index!.toString());
   // console.log(ev.dataTransfer?.getData("id"));
  }

  drop(ev: DragEvent, interval:string|undefined) {
    ev.preventDefault();
    const data = parseInt(ev.dataTransfer?.getData("id")!);

    const hourMin=interval?.split(":");
    this.events[data!].startTime!.setMinutes(parseInt(hourMin![1]));
    this.events[data!].startTime!.setHours(parseInt(hourMin![0]));
    this.sortEvents();
    this.groupEvents=[];
    this.setGroupEvents();
  }

  dropOnEvent(ev: DragEvent, startTime:Date|undefined) {
    ev.preventDefault();
    const data = parseInt(ev.dataTransfer?.getData("id")!);

    this.events[data!].startTime=new Date(startTime!.toString());
    this.sortEvents();
    this.groupEvents=[];
    this.setGroupEvents();

  }

  allowDrop(ev: DragEvent) {
    ev.preventDefault();
  }
}
