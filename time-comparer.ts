import Benchmark from "benchmark";

interface FunctionInfo {
  name: string;
  function: () => void;
}

interface TimeComparerConstructorArgs {
  ethersFunction: () => void;
  viemFunction: () => void;
  targetFnName: string;
}

export class TimeComparer {
  private readonly ethersFunction: () => void;
  private readonly viemFunction: () => void;
  private readonly targetFnName: string;

  constructor({
    ethersFunction,
    viemFunction,
    targetFnName,
  }: TimeComparerConstructorArgs) {
    this.ethersFunction = ethersFunction;
    this.viemFunction = viemFunction;
    this.targetFnName = targetFnName;
  }

  public run() {
    const suite = new Benchmark.Suite();

    console.log(`${this.targetFnName} 테스트를 시작합니다!`);

    suite
      .add("ethers", this.ethersFunction)
      .add("viem", this.viemFunction)
      .on("cycle", function (event: any) {
        console.log(String(event.target));
      })
      .on("complete", function () {
        console.log(
          `${this.filter("fastest").map("name")}의 실행 시간이 더 빠르네요! :)`,
        );
      })
      .run({ async: true });
  }
}
