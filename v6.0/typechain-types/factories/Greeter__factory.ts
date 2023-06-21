/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { Greeter, GreeterInterface } from "../Greeter";

const _abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "greet",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_greeting",
        type: "string",
      },
    ],
    name: "setGreeting",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60806040523480156200001157600080fd5b5060405162000d7438038062000d7483398181016040528101906200003791906200040e565b6200005367a76cdec013ad1b1060c01b620000f760201b60201c565b6200006f67425908a9d3232c4860c01b620000f760201b60201c565b6200008b67073a5e377075215060c01b620000f760201b60201c565b620000bb60405180606001604052806022815260200162000d526022913982620000fa60201b6200025a1760201c565b620000d767aaa36f44a0d7f95d60c01b620000f760201b60201c565b8060009080519060200190620000ef929190620001c1565b50506200055c565b50565b6200019c828260405160240162000113929190620004bc565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050620001a060201b60201c565b5050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b828054620001cf9062000526565b90600052602060002090601f016020900481019282620001f357600085556200023f565b82601f106200020e57805160ff19168380011785556200023f565b828001600101855582156200023f579182015b828111156200023e57825182559160200191906001019062000221565b5b5090506200024e919062000252565b5090565b5b808211156200026d57600081600090555060010162000253565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620002da826200028f565b810181811067ffffffffffffffff82111715620002fc57620002fb620002a0565b5b80604052505050565b60006200031162000271565b90506200031f8282620002cf565b919050565b600067ffffffffffffffff821115620003425762000341620002a0565b5b6200034d826200028f565b9050602081019050919050565b60005b838110156200037a5780820151818401526020810190506200035d565b838111156200038a576000848401525b50505050565b6000620003a7620003a18462000324565b62000305565b905082815260208101848484011115620003c657620003c56200028a565b5b620003d38482856200035a565b509392505050565b600082601f830112620003f357620003f262000285565b5b81516200040584826020860162000390565b91505092915050565b6000602082840312156200042757620004266200027b565b5b600082015167ffffffffffffffff81111562000448576200044762000280565b5b6200045684828501620003db565b91505092915050565b600081519050919050565b600082825260208201905092915050565b600062000488826200045f565b6200049481856200046a565b9350620004a68185602086016200035a565b620004b1816200028f565b840191505092915050565b60006040820190508181036000830152620004d881856200047b565b90508181036020830152620004ee81846200047b565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200053f57607f821691505b60208210811415620005565762000555620004f7565b5b50919050565b6107e6806200056c6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063a41368621461003b578063cfae321714610057575b600080fd5b610055600480360381019061005091906105b6565b610075565b005b61005f61018c565b60405161006c9190610687565b60405180910390f35b61008967f53c54c39b02af3860c01b6102f6565b61009d6789ba6c3061a9d15a60c01b6102f6565b6100b16740a254f845d8629160c01b6102f6565b61015e60405180606001604052806023815260200161078e60239139600080546100da906106d8565b80601f0160208091040260200160405190810160405280929190818152602001828054610106906106d8565b80156101535780601f1061012857610100808354040283529160200191610153565b820191906000526020600020905b81548152906001019060200180831161013657829003601f168201915b5050505050836102f9565b610172676836976a9126dd4860c01b6102f6565b80600090805190602001906101889291906103b9565b5050565b60606101a2671559a213cfb4315460c01b6102f6565b6101b6670541374b1f622cce60c01b6102f6565b6101ca674a821edf20066b3d60c01b6102f6565b600080546101d7906106d8565b80601f0160208091040260200160405190810160405280929190818152602001828054610203906106d8565b80156102505780601f1061022557610100808354040283529160200191610250565b820191906000526020600020905b81548152906001019060200180831161023357829003601f168201915b5050505050905090565b6102f2828260405160240161027092919061070a565b6040516020818303038152906040527f4b5c4277000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610398565b5050565b50565b61039383838360405160240161031193929190610741565b6040516020818303038152906040527f2ced7cef000000000000000000000000000000000000000000000000000000007bffffffffffffffffffffffffffffffffffffffffffffffffffffffff19166020820180517bffffffffffffffffffffffffffffffffffffffffffffffffffffffff8381831617835250505050610398565b505050565b60006a636f6e736f6c652e6c6f679050600080835160208501845afa505050565b8280546103c5906106d8565b90600052602060002090601f0160209004810192826103e7576000855561042e565b82601f1061040057805160ff191683800117855561042e565b8280016001018555821561042e579182015b8281111561042d578251825591602001919060010190610412565b5b50905061043b919061043f565b5090565b5b80821115610458576000816000905550600101610440565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6104c38261047a565b810181811067ffffffffffffffff821117156104e2576104e161048b565b5b80604052505050565b60006104f561045c565b905061050182826104ba565b919050565b600067ffffffffffffffff8211156105215761052061048b565b5b61052a8261047a565b9050602081019050919050565b82818337600083830152505050565b600061055961055484610506565b6104eb565b90508281526020810184848401111561057557610574610475565b5b610580848285610537565b509392505050565b600082601f83011261059d5761059c610470565b5b81356105ad848260208601610546565b91505092915050565b6000602082840312156105cc576105cb610466565b5b600082013567ffffffffffffffff8111156105ea576105e961046b565b5b6105f684828501610588565b91505092915050565b600081519050919050565b600082825260208201905092915050565b60005b8381101561063957808201518184015260208101905061061e565b83811115610648576000848401525b50505050565b6000610659826105ff565b610663818561060a565b935061067381856020860161061b565b61067c8161047a565b840191505092915050565b600060208201905081810360008301526106a1818461064e565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806106f057607f821691505b60208210811415610704576107036106a9565b5b50919050565b60006040820190508181036000830152610724818561064e565b90508181036020830152610738818461064e565b90509392505050565b6000606082019050818103600083015261075b818661064e565b9050818103602083015261076f818561064e565b90508181036040830152610783818461064e565b905094935050505056fe4368616e67696e67206772656574696e672066726f6d202725732720746f2027257327a2646970667358221220b09c2eff565de331b1049291ab897f4902eb1e69f94915abdf9d8643f51c89ef64736f6c634300080900334465706c6f79696e67206120477265657465722077697468206772656574696e673a";

type GreeterConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: GreeterConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Greeter__factory extends ContractFactory {
  constructor(...args: GreeterConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _greeting: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Greeter> {
    return super.deploy(_greeting, overrides || {}) as Promise<Greeter>;
  }
  override getDeployTransaction(
    _greeting: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_greeting, overrides || {});
  }
  override attach(address: string): Greeter {
    return super.attach(address) as Greeter;
  }
  override connect(signer: Signer): Greeter__factory {
    return super.connect(signer) as Greeter__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): GreeterInterface {
    return new utils.Interface(_abi) as GreeterInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Greeter {
    return new Contract(address, _abi, signerOrProvider) as Greeter;
  }
}
