# Chai – A simple ERC20 wrapper over the Dai Savings Rate

Today we are introducing `Chai`, an ERC20 token that lets you earn interest on Dai without requiring it to be locked in the Dai Savings Rate. It can be transfered freely and is always redeemable for an ever growing amount of Dai. Interact with the Chai contract at [chai.money](https://chai.money).

Chai lives on the Ethereum mainnet at address `0x06AF07097C9Eeb7fD685c692751D5C66dB49c215`.

![](https://i.imgur.com/DbTXS3b.gif)
_Somethings brewing..._

## What is Chai?
With the launch of multi-collateral Dai, Dai holders can earn risk-free interest on their coins using the Dai Savings Contract, also known as the `Pot`. The interest is funded out of the stability fees paid by CDP users, and is 2% per year at the time of writing. Even though Dai deposited in the savings contract remains instantly redeemable, interest accruing Dai cannot be directly transfered, or used in other dapps. Chai solves this by essentially "unlocking" your Dai savings balance, making it transferable, fungible, and ready for further DeFi integrations.

When you convert your Dai to Chai, you receive a corresponding balance in the Chai contract. While your Chai balance remains constant, its corresponding Dai value grows with the Dai Savings Rate. You can think of it as Dai *brewing* in the Chai contract. At any point in time you can redeem your Dai along with additional interest, or continue to use the Chai token directly.

## What does it do?

Besides the standard ERC20 functions for transfering Chai, we want to highlight these some additional features of the contract. For more information about the `chai.sol` contract, check out the [README](https://github.com/dapphub/chai).

### Dai deposits and withdrawals

A Dai user can convert their Dai into Chai at any point, by calling `join`. Likewise, they can convert their Chai into Dai at any point, by calling `exit`.

### Dai-denominated transfers and withdrawals

With the amount of Dai redeemable for one Chai constantly growing, the contract offers a few helper functions that operate on Chai balances in terms of their underlying Dai value.
For example, with the method `move(address sender, address receiver, uint value)`, the `sender` will transfer just enough Chai to ensure that the `receiver` gets an amount of Chai worth `value` Dai (the exact amount of Chai transfered is determined when the transaction is included in a block).

Similarly, the `draw` function lets users withdraw Dai by specify the amount of Dai they wish to redeem.

### Support for gasless token interactions

Paying gas for transactions that primarly deal with tokens creates unneccessary friction and positions tokens as second-class citizens in the Ethereum ecosystem. While there are many ways of dealing with this problem, both the Chai and the Dai contract provide a particularly simple and general solution by allowing approvals to be done with a signed message (known as a`permit`) in the ERC20 directly.

While designing the `dai.sol` token contract, we experimented with various ways of performing token operations using signatures, until we realized that the only operation that had to be added to the contract directly was `permit`.

By allowing users to give allowance to arbitrary addresses by signing a `permit`, we allow abstract gasless operations without committing to a particular way of doing transfer-by-signature, trade-by-signature, or any other token interaction. We achieve full generality by just adding one function to the ERC20 standard. In fact, one of the reasons we felt compelled to write the `Chai` contract was because we wanted Savings Dai deposits to have this feature.

Note that the interface at [chai.money](https://chai.money) does not yet support gasless transfers, but we are working on a something that demonstrates the full power of the `permit` pattern. Stay tuned for updates!

## Disclaimer

The deployed `Chai` contract has undergone a two day security review by Trail of Bits. No security related issues were found. The attestation of the review can be found [here](./Trail_Of_Bits-Letter_of_Attestation_Chai.pdf). Although we believe it to be straightforward enough to not contain any surprises, remember that on the blockchain, you are responsible for your own actions.

## Resources
The contract source code can be found at [github.com/dapphub/chai](https://github.com/dapphub/chai).
The source code for chai.money is at [github.com/lucasvo/chui](https://github.com/lucasvo/chui).
Everything distributed under the AGPL license.


*Martin Lundfall, Lucas Vogelsang, Lev Livnev*
