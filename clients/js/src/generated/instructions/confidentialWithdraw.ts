/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  AccountRole,
  combineCodec,
  getI8Decoder,
  getI8Encoder,
  getStructDecoder,
  getStructEncoder,
  getU64Decoder,
  getU64Encoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IAccountSignerMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type ReadonlyAccount,
  type ReadonlySignerAccount,
  type TransactionSigner,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';
import {
  getDecryptableBalanceDecoder,
  getDecryptableBalanceEncoder,
  type DecryptableBalance,
  type DecryptableBalanceArgs,
} from '../types';

export const CONFIDENTIAL_WITHDRAW_DISCRIMINATOR = 27;

export function getConfidentialWithdrawDiscriminatorBytes() {
  return getU8Encoder().encode(CONFIDENTIAL_WITHDRAW_DISCRIMINATOR);
}

export const CONFIDENTIAL_WITHDRAW_CONFIDENTIAL_TRANSFER_DISCRIMINATOR = 6;

export function getConfidentialWithdrawConfidentialTransferDiscriminatorBytes() {
  return getU8Encoder().encode(
    CONFIDENTIAL_WITHDRAW_CONFIDENTIAL_TRANSFER_DISCRIMINATOR
  );
}

export type ConfidentialWithdrawInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountToken extends string | IAccountMeta<string> = string,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountInstructionsSysvar extends string | IAccountMeta<string> = string,
  TAccountEqualityRecord extends string | IAccountMeta<string> = string,
  TAccountRangeRecord extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountToken extends string
        ? WritableAccount<TAccountToken>
        : TAccountToken,
      TAccountMint extends string
        ? ReadonlyAccount<TAccountMint>
        : TAccountMint,
      TAccountInstructionsSysvar extends string
        ? ReadonlyAccount<TAccountInstructionsSysvar>
        : TAccountInstructionsSysvar,
      TAccountEqualityRecord extends string
        ? ReadonlyAccount<TAccountEqualityRecord>
        : TAccountEqualityRecord,
      TAccountRangeRecord extends string
        ? ReadonlyAccount<TAccountRangeRecord>
        : TAccountRangeRecord,
      TAccountAuthority extends string
        ? ReadonlyAccount<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts,
    ]
  >;

export type ConfidentialWithdrawInstructionData = {
  discriminator: number;
  confidentialTransferDiscriminator: number;
  /** The amount of tokens to withdraw. */
  amount: bigint;
  /** Expected number of base 10 digits to the right of the decimal place. */
  decimals: number;
  /** The new decryptable balance if the withdrawal succeeds. */
  newDecryptableAvailableBalance: DecryptableBalance;
  /**
   * Relative location of the
   * `ProofInstruction::VerifyCiphertextCommitmentEquality` instruction
   * to the `Withdraw` instruction in the transaction. If the offset is
   * `0`, then use a context state account for the proof.
   */
  equalityProofInstructionOffset: number;
  /**
   * Relative location of the `ProofInstruction::BatchedRangeProofU64`
   * instruction to the `Withdraw` instruction in the transaction. If the
   * offset is `0`, then use a context state account for the proof.
   */
  rangeProofInstructionOffset: number;
};

export type ConfidentialWithdrawInstructionDataArgs = {
  /** The amount of tokens to withdraw. */
  amount: number | bigint;
  /** Expected number of base 10 digits to the right of the decimal place. */
  decimals: number;
  /** The new decryptable balance if the withdrawal succeeds. */
  newDecryptableAvailableBalance: DecryptableBalanceArgs;
  /**
   * Relative location of the
   * `ProofInstruction::VerifyCiphertextCommitmentEquality` instruction
   * to the `Withdraw` instruction in the transaction. If the offset is
   * `0`, then use a context state account for the proof.
   */
  equalityProofInstructionOffset: number;
  /**
   * Relative location of the `ProofInstruction::BatchedRangeProofU64`
   * instruction to the `Withdraw` instruction in the transaction. If the
   * offset is `0`, then use a context state account for the proof.
   */
  rangeProofInstructionOffset: number;
};

export function getConfidentialWithdrawInstructionDataEncoder(): Encoder<ConfidentialWithdrawInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['confidentialTransferDiscriminator', getU8Encoder()],
      ['amount', getU64Encoder()],
      ['decimals', getU8Encoder()],
      ['newDecryptableAvailableBalance', getDecryptableBalanceEncoder()],
      ['equalityProofInstructionOffset', getI8Encoder()],
      ['rangeProofInstructionOffset', getI8Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: CONFIDENTIAL_WITHDRAW_DISCRIMINATOR,
      confidentialTransferDiscriminator:
        CONFIDENTIAL_WITHDRAW_CONFIDENTIAL_TRANSFER_DISCRIMINATOR,
    })
  );
}

export function getConfidentialWithdrawInstructionDataDecoder(): Decoder<ConfidentialWithdrawInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['confidentialTransferDiscriminator', getU8Decoder()],
    ['amount', getU64Decoder()],
    ['decimals', getU8Decoder()],
    ['newDecryptableAvailableBalance', getDecryptableBalanceDecoder()],
    ['equalityProofInstructionOffset', getI8Decoder()],
    ['rangeProofInstructionOffset', getI8Decoder()],
  ]);
}

export function getConfidentialWithdrawInstructionDataCodec(): Codec<
  ConfidentialWithdrawInstructionDataArgs,
  ConfidentialWithdrawInstructionData
> {
  return combineCodec(
    getConfidentialWithdrawInstructionDataEncoder(),
    getConfidentialWithdrawInstructionDataDecoder()
  );
}

export type ConfidentialWithdrawInput<
  TAccountToken extends string = string,
  TAccountMint extends string = string,
  TAccountInstructionsSysvar extends string = string,
  TAccountEqualityRecord extends string = string,
  TAccountRangeRecord extends string = string,
  TAccountAuthority extends string = string,
> = {
  /** The SPL Token account. */
  token: Address<TAccountToken>;
  /** The corresponding SPL Token mint. */
  mint: Address<TAccountMint>;
  /**
   * Instructions sysvar if at least one of the
   * `zk_elgamal_proof` instructions are included in the same
   * transaction.
   */
  instructionsSysvar?: Address<TAccountInstructionsSysvar>;
  /** (Optional) Equality proof record account or context state account. */
  equalityRecord?: Address<TAccountEqualityRecord>;
  /** (Optional) Range proof record account or context state account. */
  rangeRecord?: Address<TAccountRangeRecord>;
  /** The source account's owner/delegate or its multisignature account. */
  authority: Address<TAccountAuthority> | TransactionSigner<TAccountAuthority>;
  amount: ConfidentialWithdrawInstructionDataArgs['amount'];
  decimals: ConfidentialWithdrawInstructionDataArgs['decimals'];
  newDecryptableAvailableBalance: ConfidentialWithdrawInstructionDataArgs['newDecryptableAvailableBalance'];
  equalityProofInstructionOffset: ConfidentialWithdrawInstructionDataArgs['equalityProofInstructionOffset'];
  rangeProofInstructionOffset: ConfidentialWithdrawInstructionDataArgs['rangeProofInstructionOffset'];
  multiSigners?: Array<TransactionSigner>;
};

export function getConfidentialWithdrawInstruction<
  TAccountToken extends string,
  TAccountMint extends string,
  TAccountInstructionsSysvar extends string,
  TAccountEqualityRecord extends string,
  TAccountRangeRecord extends string,
  TAccountAuthority extends string,
  TProgramAddress extends Address = typeof TOKEN_2022_PROGRAM_ADDRESS,
>(
  input: ConfidentialWithdrawInput<
    TAccountToken,
    TAccountMint,
    TAccountInstructionsSysvar,
    TAccountEqualityRecord,
    TAccountRangeRecord,
    TAccountAuthority
  >,
  config?: { programAddress?: TProgramAddress }
): ConfidentialWithdrawInstruction<
  TProgramAddress,
  TAccountToken,
  TAccountMint,
  TAccountInstructionsSysvar,
  TAccountEqualityRecord,
  TAccountRangeRecord,
  (typeof input)['authority'] extends TransactionSigner<TAccountAuthority>
    ? ReadonlySignerAccount<TAccountAuthority> &
        IAccountSignerMeta<TAccountAuthority>
    : TAccountAuthority
> {
  // Program address.
  const programAddress = config?.programAddress ?? TOKEN_2022_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    token: { value: input.token ?? null, isWritable: true },
    mint: { value: input.mint ?? null, isWritable: false },
    instructionsSysvar: {
      value: input.instructionsSysvar ?? null,
      isWritable: false,
    },
    equalityRecord: { value: input.equalityRecord ?? null, isWritable: false },
    rangeRecord: { value: input.rangeRecord ?? null, isWritable: false },
    authority: { value: input.authority ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Remaining accounts.
  const remainingAccounts: IAccountMeta[] = (args.multiSigners ?? []).map(
    (signer) => ({
      address: signer.address,
      role: AccountRole.READONLY_SIGNER,
      signer,
    })
  );

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.token),
      getAccountMeta(accounts.mint),
      getAccountMeta(accounts.instructionsSysvar),
      getAccountMeta(accounts.equalityRecord),
      getAccountMeta(accounts.rangeRecord),
      getAccountMeta(accounts.authority),
      ...remainingAccounts,
    ],
    programAddress,
    data: getConfidentialWithdrawInstructionDataEncoder().encode(
      args as ConfidentialWithdrawInstructionDataArgs
    ),
  } as ConfidentialWithdrawInstruction<
    TProgramAddress,
    TAccountToken,
    TAccountMint,
    TAccountInstructionsSysvar,
    TAccountEqualityRecord,
    TAccountRangeRecord,
    (typeof input)['authority'] extends TransactionSigner<TAccountAuthority>
      ? ReadonlySignerAccount<TAccountAuthority> &
          IAccountSignerMeta<TAccountAuthority>
      : TAccountAuthority
  >;

  return instruction;
}

export type ParsedConfidentialWithdrawInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The SPL Token account. */
    token: TAccountMetas[0];
    /** The corresponding SPL Token mint. */
    mint: TAccountMetas[1];
    /**
     * Instructions sysvar if at least one of the
     * `zk_elgamal_proof` instructions are included in the same
     * transaction.
     */

    instructionsSysvar?: TAccountMetas[2] | undefined;
    /** (Optional) Equality proof record account or context state account. */
    equalityRecord?: TAccountMetas[3] | undefined;
    /** (Optional) Range proof record account or context state account. */
    rangeRecord?: TAccountMetas[4] | undefined;
    /** The source account's owner/delegate or its multisignature account. */
    authority: TAccountMetas[5];
  };
  data: ConfidentialWithdrawInstructionData;
};

export function parseConfidentialWithdrawInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedConfidentialWithdrawInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 6) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === TOKEN_2022_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      token: getNextAccount(),
      mint: getNextAccount(),
      instructionsSysvar: getNextOptionalAccount(),
      equalityRecord: getNextOptionalAccount(),
      rangeRecord: getNextOptionalAccount(),
      authority: getNextAccount(),
    },
    data: getConfidentialWithdrawInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
