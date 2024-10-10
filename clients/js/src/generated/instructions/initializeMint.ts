/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  combineCodec,
  getAddressDecoder,
  getAddressEncoder,
  getOptionDecoder,
  getOptionEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  none,
  transformEncoder,
  type Address,
  type Codec,
  type Decoder,
  type Encoder,
  type IAccountMeta,
  type IInstruction,
  type IInstructionWithAccounts,
  type IInstructionWithData,
  type Option,
  type OptionOrNullable,
  type ReadonlyAccount,
  type WritableAccount,
} from '@solana/web3.js';
import { TOKEN_2022_PROGRAM_ADDRESS } from '../programs';
import { getAccountMetaFactory, type ResolvedAccount } from '../shared';

export const INITIALIZE_MINT_DISCRIMINATOR = 0;

export function getInitializeMintDiscriminatorBytes() {
  return getU8Encoder().encode(INITIALIZE_MINT_DISCRIMINATOR);
}

export type InitializeMintInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMint extends string | IAccountMeta<string> = string,
  TAccountRent extends
    | string
    | IAccountMeta<string> = 'SysvarRent111111111111111111111111111111111',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountMint extends string
        ? WritableAccount<TAccountMint>
        : TAccountMint,
      TAccountRent extends string
        ? ReadonlyAccount<TAccountRent>
        : TAccountRent,
      ...TRemainingAccounts,
    ]
  >;

export type InitializeMintInstructionData = {
  discriminator: number;
  /** Number of decimals in token account amounts. */
  decimals: number;
  /** Minting authority. */
  mintAuthority: Address;
  /** Optional authority that can freeze token accounts. */
  freezeAuthority: Option<Address>;
};

export type InitializeMintInstructionDataArgs = {
  /** Number of decimals in token account amounts. */
  decimals: number;
  /** Minting authority. */
  mintAuthority: Address;
  /** Optional authority that can freeze token accounts. */
  freezeAuthority?: OptionOrNullable<Address>;
};

export function getInitializeMintInstructionDataEncoder(): Encoder<InitializeMintInstructionDataArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', getU8Encoder()],
      ['decimals', getU8Encoder()],
      ['mintAuthority', getAddressEncoder()],
      ['freezeAuthority', getOptionEncoder(getAddressEncoder())],
    ]),
    (value) => ({
      ...value,
      discriminator: INITIALIZE_MINT_DISCRIMINATOR,
      freezeAuthority: value.freezeAuthority ?? none(),
    })
  );
}

export function getInitializeMintInstructionDataDecoder(): Decoder<InitializeMintInstructionData> {
  return getStructDecoder([
    ['discriminator', getU8Decoder()],
    ['decimals', getU8Decoder()],
    ['mintAuthority', getAddressDecoder()],
    ['freezeAuthority', getOptionDecoder(getAddressDecoder())],
  ]);
}

export function getInitializeMintInstructionDataCodec(): Codec<
  InitializeMintInstructionDataArgs,
  InitializeMintInstructionData
> {
  return combineCodec(
    getInitializeMintInstructionDataEncoder(),
    getInitializeMintInstructionDataDecoder()
  );
}

export type InitializeMintInput<
  TAccountMint extends string = string,
  TAccountRent extends string = string,
> = {
  /** Token mint account. */
  mint: Address<TAccountMint>;
  /** Rent sysvar. */
  rent?: Address<TAccountRent>;
  decimals: InitializeMintInstructionDataArgs['decimals'];
  mintAuthority: InitializeMintInstructionDataArgs['mintAuthority'];
  freezeAuthority?: InitializeMintInstructionDataArgs['freezeAuthority'];
};

export function getInitializeMintInstruction<
  TAccountMint extends string,
  TAccountRent extends string,
  TProgramAddress extends Address = typeof TOKEN_2022_PROGRAM_ADDRESS,
>(
  input: InitializeMintInput<TAccountMint, TAccountRent>,
  config?: { programAddress?: TProgramAddress }
): InitializeMintInstruction<TProgramAddress, TAccountMint, TAccountRent> {
  // Program address.
  const programAddress = config?.programAddress ?? TOKEN_2022_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    mint: { value: input.mint ?? null, isWritable: true },
    rent: { value: input.rent ?? null, isWritable: false },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Original args.
  const args = { ...input };

  // Resolve default values.
  if (!accounts.rent.value) {
    accounts.rent.value =
      'SysvarRent111111111111111111111111111111111' as Address<'SysvarRent111111111111111111111111111111111'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [getAccountMeta(accounts.mint), getAccountMeta(accounts.rent)],
    programAddress,
    data: getInitializeMintInstructionDataEncoder().encode(
      args as InitializeMintInstructionDataArgs
    ),
  } as InitializeMintInstruction<TProgramAddress, TAccountMint, TAccountRent>;

  return instruction;
}

export type ParsedInitializeMintInstruction<
  TProgram extends string = typeof TOKEN_2022_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Token mint account. */
    mint: TAccountMetas[0];
    /** Rent sysvar. */
    rent: TAccountMetas[1];
  };
  data: InitializeMintInstructionData;
};

export function parseInitializeMintInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitializeMintInstruction<TProgram, TAccountMetas> {
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
      mint: getNextAccount(),
      rent: getNextAccount(),
    },
    data: getInitializeMintInstructionDataDecoder().decode(instruction.data),
  };
}
