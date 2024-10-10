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
  getStructDecoder,
  getStructEncoder,
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

export const ENABLE_CONFIDENTIAL_CREDITS_DISCRIMINATOR = 27;

export function getEnableConfidentialCreditsDiscriminatorBytes() {
  return getU8Encoder().encode(ENABLE_CONFIDENTIAL_CREDITS_DISCRIMINATOR);
}

export const ENABLE_CONFIDENTIAL_CREDITS_CONFIDENTIAL_TRANSFER_DISCRIMINATOR = 9;

export function getEnableConfidentialCreditsConfidentialTransferDiscriminatorBytes() {
  return getU8Encoder().encode(
    ENABLE_CONFIDENTIAL_CREDITS_CONFIDENTIAL_TRANSFER_DISCRIMINATOR
  );
}

export type EnableConfidentialCreditsInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountToken extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountToken extends string
        ? WritableAccount<TAccountToken>
        : TAccountToken,
      TAccountAuthority extends string
        ? ReadonlyAccount<TAccountAuthority>
        : TAccountAuthority,
      ...TRemainingAccounts,
    ]
  >;

export type EnableConfidentialCreditsInstructionData = {
  discriminator: number;
  confidentialTransferDiscriminator: number;
};

export type EnableConfidentialCreditsInstructionDataArgs = {};

export function getEnableConfidentialCreditsInstructionDataEncoder(): Encoder<EnableConfidentialCreditsInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['confidentialTransferDiscriminator', getU8Encoder()],
    ]),
    (value) => ({
      ...value,
      discriminator: ENABLE_CONFIDENTIAL_CREDITS_DISCRIMINATOR,
      confidentialTransferDiscriminator:
        ENABLE_CONFIDENTIAL_CREDITS_CONFIDENTIAL_TRANSFER_DISCRIMINATOR,
    })
  );
}

export function getEnableConfidentialCreditsInstructionDataDecoder(): Decoder<EnableConfidentialCreditsInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['confidentialTransferDiscriminator', getU8Decoder()],
  ]);
}

export function getEnableConfidentialCreditsInstructionDataCodec(): Codec<
  EnableConfidentialCreditsInstructionDataArgs,
  EnableConfidentialCreditsInstructionData
> {
  return combineCodec(
    getEnableConfidentialCreditsInstructionDataEncoder(),
    getEnableConfidentialCreditsInstructionDataDecoder()
  );
}

export type EnableConfidentialCreditsInput<
  TAccountToken extends string = string,
  TAccountAuthority extends string = string,
> = {
  /** The SPL Token account. */
  token: Address<TAccountToken>;
  /** The source account's owner/delegate or its multisignature account. */
  authority: Address<TAccountAuthority> | TransactionSigner<TAccountAuthority>;
  multiSigners?: Array<TransactionSigner>;
};

export function getEnableConfidentialCreditsInstruction<
  TAccountToken extends string,
  TAccountAuthority extends string,
  TProgramAddress extends Address = typeof TOKEN_2022_PROGRAM_ADDRESS,
>(
  input: EnableConfidentialCreditsInput<TAccountToken, TAccountAuthority>,
  config?: { programAddress?: TProgramAddress }
): EnableConfidentialCreditsInstruction<
  TProgramAddress,
  TAccountToken,
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
      getAccountMeta(accounts.authority),
      ...remainingAccounts,
    ],
    programAddress,
    data: getEnableConfidentialCreditsInstructionDataEncoder().encode({}),
  } as EnableConfidentialCreditsInstruction<
    TProgramAddress,
    TAccountToken,
    (typeof input)['authority'] extends TransactionSigner<TAccountAuthority>
      ? ReadonlySignerAccount<TAccountAuthority> &
          IAccountSignerMeta<TAccountAuthority>
      : TAccountAuthority
  >;

  return instruction;
}

export type ParsedEnableConfidentialCreditsInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The SPL Token account. */
    token: TAccountMetas[0];
    /** The source account's owner/delegate or its multisignature account. */
    authority: TAccountMetas[1];
  };
  data: EnableConfidentialCreditsInstructionData;
};

export function parseEnableConfidentialCreditsInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedEnableConfidentialCreditsInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 2) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      token: getNextAccount(),
      authority: getNextAccount(),
    },
    data: getEnableConfidentialCreditsInstructionDataDecoder().decode(
      instruction.data
    ),
  };
}
