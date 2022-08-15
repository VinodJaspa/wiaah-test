import { FilterAndAddToArray } from "utils";

interface Subscriber {
  key: string;
  cbFn: (props?: any) => any;
}

export class ReactPubsubClient {
  Subscribers: Subscriber[] = [];

  Subscribe(key: string, cb: (props?: any) => any) {
    const updatedSubscribers = FilterAndAddToArray(
      this.Subscribers,
      { key, cbFn: cb },
      "exclude",
      "key"
    );

    this.Subscribers = updatedSubscribers;
  }

  unSubscribe(key: string) {
    this.Subscribers = this.Subscribers.filter((sub) => sub.key !== key);
  }

  Publish(key: string, props?: any) {
    console.log("published", this.Subscribers);
    const findSubscriber = this.Subscribers.find((sub) => sub.key === key);
    if (findSubscriber) {
      findSubscriber.cbFn(props);
    }
  }
}
