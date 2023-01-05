
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model UserInterestKeyword
 * 
 */
export type UserInterestKeyword = {
  value: string
  score: number
}

/**
 * Model UserActivityStats
 * 
 */
export type UserActivityStats = {
  id: string
  activityScore: number
  lastActive: Date | null
  day_active_min: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model ActivityScore
 * 
 */
export type ActivityScore = {
  id: string
  score: number
}

/**
 * Model UsersInteractions
 * 
 */
export type UsersInteractions = {
  id: string
  ownerId: string
  userId: string
  postLikes: number
  commentsReply: number
  commentsLikes: number
  shares: number
  messages: number
  mentions: number
  reviewedItems: number
  profileVisits: number
  postSaved: number
  interactionScore: number
  createdAt: Date
  updatedAt: Date
}

/**
 * Model UserInterest
 * 
 */
export type UserInterest = {
  id: string
  userId: string
  keywords: UserInterestKeyword[]
}

/**
 * Model Event
 * 
 */
export type Event = {
  id: string
  key: string
  causedById: string
  causedToId: string | null
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more UserActivityStats
 * const userActivityStats = await prisma.userActivityStats.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more UserActivityStats
   * const userActivityStats = await prisma.userActivityStats.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;


  /**
   * Executes a raw MongoDB command and returns the result of it.
   * @example
   * ```
   * const user = await prisma.$runCommandRaw({
   *   aggregate: 'User',
   *   pipeline: [{ $match: { name: 'Bob' } }, { $project: { email: true, _id: false } }],
   *   explain: false,
   * })
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $runCommandRaw(command: Prisma.InputJsonObject): PrismaPromise<Prisma.JsonObject>;

      /**
   * `prisma.userActivityStats`: Exposes CRUD operations for the **UserActivityStats** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserActivityStats
    * const userActivityStats = await prisma.userActivityStats.findMany()
    * ```
    */
  get userActivityStats(): Prisma.UserActivityStatsDelegate<GlobalReject>;

  /**
   * `prisma.activityScore`: Exposes CRUD operations for the **ActivityScore** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityScores
    * const activityScores = await prisma.activityScore.findMany()
    * ```
    */
  get activityScore(): Prisma.ActivityScoreDelegate<GlobalReject>;

  /**
   * `prisma.usersInteractions`: Exposes CRUD operations for the **UsersInteractions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsersInteractions
    * const usersInteractions = await prisma.usersInteractions.findMany()
    * ```
    */
  get usersInteractions(): Prisma.UsersInteractionsDelegate<GlobalReject>;

  /**
   * `prisma.userInterest`: Exposes CRUD operations for the **UserInterest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserInterests
    * const userInterests = await prisma.userInterest.findMany()
    * ```
    */
  get userInterest(): Prisma.UserInterestDelegate<GlobalReject>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Prisma Client JS version: 3.15.2
   * Query Engine version: 461d6a05159055555eb7dfb337c9fb271cbd4d7e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    UserActivityStats: 'UserActivityStats',
    ActivityScore: 'ActivityScore',
    UsersInteractions: 'UsersInteractions',
    UserInterest: 'UserInterest',
    Event: 'Event'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model UserInterestKeyword
   */





  export type UserInterestKeywordSelect = {
    value?: boolean
    score?: boolean
  }

  export type UserInterestKeywordGetPayload<
    S extends boolean | null | undefined | UserInterestKeywordArgs,
    U = keyof S
      > = S extends true
        ? UserInterestKeyword
    : S extends undefined
    ? never
    : S extends UserInterestKeywordArgs
    ?'include' extends U
    ? UserInterestKeyword 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserInterestKeyword ? UserInterestKeyword[P] : never
  } 
    : UserInterestKeyword
  : UserInterestKeyword



  export interface UserInterestKeywordDelegate<GlobalRejectSettings> {





  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInterestKeyword.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserInterestKeywordClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * UserInterestKeyword without action
   */
  export type UserInterestKeywordArgs = {
    /**
     * Select specific fields to fetch from the UserInterestKeyword
     * 
    **/
    select?: UserInterestKeywordSelect | null
  }



  /**
   * Model UserActivityStats
   */


  export type AggregateUserActivityStats = {
    _count: UserActivityStatsCountAggregateOutputType | null
    _avg: UserActivityStatsAvgAggregateOutputType | null
    _sum: UserActivityStatsSumAggregateOutputType | null
    _min: UserActivityStatsMinAggregateOutputType | null
    _max: UserActivityStatsMaxAggregateOutputType | null
  }

  export type UserActivityStatsAvgAggregateOutputType = {
    activityScore: number | null
    day_active_min: number | null
  }

  export type UserActivityStatsSumAggregateOutputType = {
    activityScore: number | null
    day_active_min: number | null
  }

  export type UserActivityStatsMinAggregateOutputType = {
    id: string | null
    activityScore: number | null
    lastActive: Date | null
    day_active_min: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserActivityStatsMaxAggregateOutputType = {
    id: string | null
    activityScore: number | null
    lastActive: Date | null
    day_active_min: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserActivityStatsCountAggregateOutputType = {
    id: number
    activityScore: number
    lastActive: number
    day_active_min: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserActivityStatsAvgAggregateInputType = {
    activityScore?: true
    day_active_min?: true
  }

  export type UserActivityStatsSumAggregateInputType = {
    activityScore?: true
    day_active_min?: true
  }

  export type UserActivityStatsMinAggregateInputType = {
    id?: true
    activityScore?: true
    lastActive?: true
    day_active_min?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserActivityStatsMaxAggregateInputType = {
    id?: true
    activityScore?: true
    lastActive?: true
    day_active_min?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserActivityStatsCountAggregateInputType = {
    id?: true
    activityScore?: true
    lastActive?: true
    day_active_min?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserActivityStatsAggregateArgs = {
    /**
     * Filter which UserActivityStats to aggregate.
     * 
    **/
    where?: UserActivityStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserActivityStats to fetch.
     * 
    **/
    orderBy?: Enumerable<UserActivityStatsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserActivityStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserActivityStats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserActivityStats.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserActivityStats
    **/
    _count?: true | UserActivityStatsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserActivityStatsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserActivityStatsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserActivityStatsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserActivityStatsMaxAggregateInputType
  }

  export type GetUserActivityStatsAggregateType<T extends UserActivityStatsAggregateArgs> = {
        [P in keyof T & keyof AggregateUserActivityStats]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserActivityStats[P]>
      : GetScalarType<T[P], AggregateUserActivityStats[P]>
  }




  export type UserActivityStatsGroupByArgs = {
    where?: UserActivityStatsWhereInput
    orderBy?: Enumerable<UserActivityStatsOrderByWithAggregationInput>
    by: Array<UserActivityStatsScalarFieldEnum>
    having?: UserActivityStatsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserActivityStatsCountAggregateInputType | true
    _avg?: UserActivityStatsAvgAggregateInputType
    _sum?: UserActivityStatsSumAggregateInputType
    _min?: UserActivityStatsMinAggregateInputType
    _max?: UserActivityStatsMaxAggregateInputType
  }


  export type UserActivityStatsGroupByOutputType = {
    id: string
    activityScore: number
    lastActive: Date | null
    day_active_min: number
    createdAt: Date
    updatedAt: Date
    _count: UserActivityStatsCountAggregateOutputType | null
    _avg: UserActivityStatsAvgAggregateOutputType | null
    _sum: UserActivityStatsSumAggregateOutputType | null
    _min: UserActivityStatsMinAggregateOutputType | null
    _max: UserActivityStatsMaxAggregateOutputType | null
  }

  type GetUserActivityStatsGroupByPayload<T extends UserActivityStatsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserActivityStatsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserActivityStatsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserActivityStatsGroupByOutputType[P]>
            : GetScalarType<T[P], UserActivityStatsGroupByOutputType[P]>
        }
      >
    >


  export type UserActivityStatsSelect = {
    id?: boolean
    activityScore?: boolean
    lastActive?: boolean
    day_active_min?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserActivityStatsGetPayload<
    S extends boolean | null | undefined | UserActivityStatsArgs,
    U = keyof S
      > = S extends true
        ? UserActivityStats
    : S extends undefined
    ? never
    : S extends UserActivityStatsArgs | UserActivityStatsFindManyArgs
    ?'include' extends U
    ? UserActivityStats 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UserActivityStats ? UserActivityStats[P] : never
  } 
    : UserActivityStats
  : UserActivityStats


  type UserActivityStatsCountArgs = Merge<
    Omit<UserActivityStatsFindManyArgs, 'select' | 'include'> & {
      select?: UserActivityStatsCountAggregateInputType | true
    }
  >

  export interface UserActivityStatsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one UserActivityStats that matches the filter.
     * @param {UserActivityStatsFindUniqueArgs} args - Arguments to find a UserActivityStats
     * @example
     * // Get one UserActivityStats
     * const userActivityStats = await prisma.userActivityStats.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserActivityStatsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserActivityStatsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserActivityStats'> extends True ? CheckSelect<T, Prisma__UserActivityStatsClient<UserActivityStats>, Prisma__UserActivityStatsClient<UserActivityStatsGetPayload<T>>> : CheckSelect<T, Prisma__UserActivityStatsClient<UserActivityStats | null >, Prisma__UserActivityStatsClient<UserActivityStatsGetPayload<T> | null >>

    /**
     * Find the first UserActivityStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActivityStatsFindFirstArgs} args - Arguments to find a UserActivityStats
     * @example
     * // Get one UserActivityStats
     * const userActivityStats = await prisma.userActivityStats.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserActivityStatsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserActivityStatsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserActivityStats'> extends True ? CheckSelect<T, Prisma__UserActivityStatsClient<UserActivityStats>, Prisma__UserActivityStatsClient<UserActivityStatsGetPayload<T>>> : CheckSelect<T, Prisma__UserActivityStatsClient<UserActivityStats | null >, Prisma__UserActivityStatsClient<UserActivityStatsGetPayload<T> | null >>

    /**
     * Find zero or more UserActivityStats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActivityStatsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserActivityStats
     * const userActivityStats = await prisma.userActivityStats.findMany()
     * 
     * // Get first 10 UserActivityStats
     * const userActivityStats = await prisma.userActivityStats.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userActivityStatsWithIdOnly = await prisma.userActivityStats.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserActivityStatsFindManyArgs>(
      args?: SelectSubset<T, UserActivityStatsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<UserActivityStats>>, PrismaPromise<Array<UserActivityStatsGetPayload<T>>>>

    /**
     * Create a UserActivityStats.
     * @param {UserActivityStatsCreateArgs} args - Arguments to create a UserActivityStats.
     * @example
     * // Create one UserActivityStats
     * const UserActivityStats = await prisma.userActivityStats.create({
     *   data: {
     *     // ... data to create a UserActivityStats
     *   }
     * })
     * 
    **/
    create<T extends UserActivityStatsCreateArgs>(
      args: SelectSubset<T, UserActivityStatsCreateArgs>
    ): CheckSelect<T, Prisma__UserActivityStatsClient<UserActivityStats>, Prisma__UserActivityStatsClient<UserActivityStatsGetPayload<T>>>

    /**
     * Create many UserActivityStats.
     *     @param {UserActivityStatsCreateManyArgs} args - Arguments to create many UserActivityStats.
     *     @example
     *     // Create many UserActivityStats
     *     const userActivityStats = await prisma.userActivityStats.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserActivityStatsCreateManyArgs>(
      args?: SelectSubset<T, UserActivityStatsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a UserActivityStats.
     * @param {UserActivityStatsDeleteArgs} args - Arguments to delete one UserActivityStats.
     * @example
     * // Delete one UserActivityStats
     * const UserActivityStats = await prisma.userActivityStats.delete({
     *   where: {
     *     // ... filter to delete one UserActivityStats
     *   }
     * })
     * 
    **/
    delete<T extends UserActivityStatsDeleteArgs>(
      args: SelectSubset<T, UserActivityStatsDeleteArgs>
    ): CheckSelect<T, Prisma__UserActivityStatsClient<UserActivityStats>, Prisma__UserActivityStatsClient<UserActivityStatsGetPayload<T>>>

    /**
     * Update one UserActivityStats.
     * @param {UserActivityStatsUpdateArgs} args - Arguments to update one UserActivityStats.
     * @example
     * // Update one UserActivityStats
     * const userActivityStats = await prisma.userActivityStats.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserActivityStatsUpdateArgs>(
      args: SelectSubset<T, UserActivityStatsUpdateArgs>
    ): CheckSelect<T, Prisma__UserActivityStatsClient<UserActivityStats>, Prisma__UserActivityStatsClient<UserActivityStatsGetPayload<T>>>

    /**
     * Delete zero or more UserActivityStats.
     * @param {UserActivityStatsDeleteManyArgs} args - Arguments to filter UserActivityStats to delete.
     * @example
     * // Delete a few UserActivityStats
     * const { count } = await prisma.userActivityStats.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserActivityStatsDeleteManyArgs>(
      args?: SelectSubset<T, UserActivityStatsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserActivityStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActivityStatsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserActivityStats
     * const userActivityStats = await prisma.userActivityStats.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserActivityStatsUpdateManyArgs>(
      args: SelectSubset<T, UserActivityStatsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one UserActivityStats.
     * @param {UserActivityStatsUpsertArgs} args - Arguments to update or create a UserActivityStats.
     * @example
     * // Update or create a UserActivityStats
     * const userActivityStats = await prisma.userActivityStats.upsert({
     *   create: {
     *     // ... data to create a UserActivityStats
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserActivityStats we want to update
     *   }
     * })
    **/
    upsert<T extends UserActivityStatsUpsertArgs>(
      args: SelectSubset<T, UserActivityStatsUpsertArgs>
    ): CheckSelect<T, Prisma__UserActivityStatsClient<UserActivityStats>, Prisma__UserActivityStatsClient<UserActivityStatsGetPayload<T>>>

    /**
     * Find zero or more UserActivityStats that matches the filter.
     * @param {UserActivityStatsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userActivityStats = await prisma.userActivityStats.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserActivityStatsFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserActivityStats.
     * @param {UserActivityStatsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userActivityStats = await prisma.userActivityStats.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserActivityStatsAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of UserActivityStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActivityStatsCountArgs} args - Arguments to filter UserActivityStats to count.
     * @example
     * // Count the number of UserActivityStats
     * const count = await prisma.userActivityStats.count({
     *   where: {
     *     // ... the filter for the UserActivityStats we want to count
     *   }
     * })
    **/
    count<T extends UserActivityStatsCountArgs>(
      args?: Subset<T, UserActivityStatsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserActivityStatsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserActivityStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActivityStatsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserActivityStatsAggregateArgs>(args: Subset<T, UserActivityStatsAggregateArgs>): PrismaPromise<GetUserActivityStatsAggregateType<T>>

    /**
     * Group by UserActivityStats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserActivityStatsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserActivityStatsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserActivityStatsGroupByArgs['orderBy'] }
        : { orderBy?: UserActivityStatsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserActivityStatsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserActivityStatsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserActivityStats.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserActivityStatsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * UserActivityStats findUnique
   */
  export type UserActivityStatsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the UserActivityStats
     * 
    **/
    select?: UserActivityStatsSelect | null
    /**
     * Throw an Error if a UserActivityStats can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UserActivityStats to fetch.
     * 
    **/
    where: UserActivityStatsWhereUniqueInput
  }


  /**
   * UserActivityStats findFirst
   */
  export type UserActivityStatsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the UserActivityStats
     * 
    **/
    select?: UserActivityStatsSelect | null
    /**
     * Throw an Error if a UserActivityStats can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UserActivityStats to fetch.
     * 
    **/
    where?: UserActivityStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserActivityStats to fetch.
     * 
    **/
    orderBy?: Enumerable<UserActivityStatsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserActivityStats.
     * 
    **/
    cursor?: UserActivityStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserActivityStats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserActivityStats.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserActivityStats.
     * 
    **/
    distinct?: Enumerable<UserActivityStatsScalarFieldEnum>
  }


  /**
   * UserActivityStats findMany
   */
  export type UserActivityStatsFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserActivityStats
     * 
    **/
    select?: UserActivityStatsSelect | null
    /**
     * Filter, which UserActivityStats to fetch.
     * 
    **/
    where?: UserActivityStatsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserActivityStats to fetch.
     * 
    **/
    orderBy?: Enumerable<UserActivityStatsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserActivityStats.
     * 
    **/
    cursor?: UserActivityStatsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserActivityStats from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserActivityStats.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserActivityStatsScalarFieldEnum>
  }


  /**
   * UserActivityStats create
   */
  export type UserActivityStatsCreateArgs = {
    /**
     * Select specific fields to fetch from the UserActivityStats
     * 
    **/
    select?: UserActivityStatsSelect | null
    /**
     * The data needed to create a UserActivityStats.
     * 
    **/
    data: XOR<UserActivityStatsCreateInput, UserActivityStatsUncheckedCreateInput>
  }


  /**
   * UserActivityStats createMany
   */
  export type UserActivityStatsCreateManyArgs = {
    /**
     * The data used to create many UserActivityStats.
     * 
    **/
    data: Enumerable<UserActivityStatsCreateManyInput>
  }


  /**
   * UserActivityStats update
   */
  export type UserActivityStatsUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserActivityStats
     * 
    **/
    select?: UserActivityStatsSelect | null
    /**
     * The data needed to update a UserActivityStats.
     * 
    **/
    data: XOR<UserActivityStatsUpdateInput, UserActivityStatsUncheckedUpdateInput>
    /**
     * Choose, which UserActivityStats to update.
     * 
    **/
    where: UserActivityStatsWhereUniqueInput
  }


  /**
   * UserActivityStats updateMany
   */
  export type UserActivityStatsUpdateManyArgs = {
    /**
     * The data used to update UserActivityStats.
     * 
    **/
    data: XOR<UserActivityStatsUpdateManyMutationInput, UserActivityStatsUncheckedUpdateManyInput>
    /**
     * Filter which UserActivityStats to update
     * 
    **/
    where?: UserActivityStatsWhereInput
  }


  /**
   * UserActivityStats upsert
   */
  export type UserActivityStatsUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserActivityStats
     * 
    **/
    select?: UserActivityStatsSelect | null
    /**
     * The filter to search for the UserActivityStats to update in case it exists.
     * 
    **/
    where: UserActivityStatsWhereUniqueInput
    /**
     * In case the UserActivityStats found by the `where` argument doesn't exist, create a new UserActivityStats with this data.
     * 
    **/
    create: XOR<UserActivityStatsCreateInput, UserActivityStatsUncheckedCreateInput>
    /**
     * In case the UserActivityStats was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserActivityStatsUpdateInput, UserActivityStatsUncheckedUpdateInput>
  }


  /**
   * UserActivityStats delete
   */
  export type UserActivityStatsDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserActivityStats
     * 
    **/
    select?: UserActivityStatsSelect | null
    /**
     * Filter which UserActivityStats to delete.
     * 
    **/
    where: UserActivityStatsWhereUniqueInput
  }


  /**
   * UserActivityStats deleteMany
   */
  export type UserActivityStatsDeleteManyArgs = {
    /**
     * Filter which UserActivityStats to delete
     * 
    **/
    where?: UserActivityStatsWhereInput
  }


  /**
   * UserActivityStats findRaw
   */
  export type UserActivityStatsFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * UserActivityStats aggregateRaw
   */
  export type UserActivityStatsAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * UserActivityStats without action
   */
  export type UserActivityStatsArgs = {
    /**
     * Select specific fields to fetch from the UserActivityStats
     * 
    **/
    select?: UserActivityStatsSelect | null
  }



  /**
   * Model ActivityScore
   */


  export type AggregateActivityScore = {
    _count: ActivityScoreCountAggregateOutputType | null
    _avg: ActivityScoreAvgAggregateOutputType | null
    _sum: ActivityScoreSumAggregateOutputType | null
    _min: ActivityScoreMinAggregateOutputType | null
    _max: ActivityScoreMaxAggregateOutputType | null
  }

  export type ActivityScoreAvgAggregateOutputType = {
    score: number | null
  }

  export type ActivityScoreSumAggregateOutputType = {
    score: number | null
  }

  export type ActivityScoreMinAggregateOutputType = {
    id: string | null
    score: number | null
  }

  export type ActivityScoreMaxAggregateOutputType = {
    id: string | null
    score: number | null
  }

  export type ActivityScoreCountAggregateOutputType = {
    id: number
    score: number
    _all: number
  }


  export type ActivityScoreAvgAggregateInputType = {
    score?: true
  }

  export type ActivityScoreSumAggregateInputType = {
    score?: true
  }

  export type ActivityScoreMinAggregateInputType = {
    id?: true
    score?: true
  }

  export type ActivityScoreMaxAggregateInputType = {
    id?: true
    score?: true
  }

  export type ActivityScoreCountAggregateInputType = {
    id?: true
    score?: true
    _all?: true
  }

  export type ActivityScoreAggregateArgs = {
    /**
     * Filter which ActivityScore to aggregate.
     * 
    **/
    where?: ActivityScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityScores to fetch.
     * 
    **/
    orderBy?: Enumerable<ActivityScoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: ActivityScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityScores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityScores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityScores
    **/
    _count?: true | ActivityScoreCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityScoreAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivityScoreSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityScoreMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityScoreMaxAggregateInputType
  }

  export type GetActivityScoreAggregateType<T extends ActivityScoreAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityScore]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityScore[P]>
      : GetScalarType<T[P], AggregateActivityScore[P]>
  }




  export type ActivityScoreGroupByArgs = {
    where?: ActivityScoreWhereInput
    orderBy?: Enumerable<ActivityScoreOrderByWithAggregationInput>
    by: Array<ActivityScoreScalarFieldEnum>
    having?: ActivityScoreScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityScoreCountAggregateInputType | true
    _avg?: ActivityScoreAvgAggregateInputType
    _sum?: ActivityScoreSumAggregateInputType
    _min?: ActivityScoreMinAggregateInputType
    _max?: ActivityScoreMaxAggregateInputType
  }


  export type ActivityScoreGroupByOutputType = {
    id: string
    score: number
    _count: ActivityScoreCountAggregateOutputType | null
    _avg: ActivityScoreAvgAggregateOutputType | null
    _sum: ActivityScoreSumAggregateOutputType | null
    _min: ActivityScoreMinAggregateOutputType | null
    _max: ActivityScoreMaxAggregateOutputType | null
  }

  type GetActivityScoreGroupByPayload<T extends ActivityScoreGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ActivityScoreGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityScoreGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityScoreGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityScoreGroupByOutputType[P]>
        }
      >
    >


  export type ActivityScoreSelect = {
    id?: boolean
    score?: boolean
  }

  export type ActivityScoreGetPayload<
    S extends boolean | null | undefined | ActivityScoreArgs,
    U = keyof S
      > = S extends true
        ? ActivityScore
    : S extends undefined
    ? never
    : S extends ActivityScoreArgs | ActivityScoreFindManyArgs
    ?'include' extends U
    ? ActivityScore 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof ActivityScore ? ActivityScore[P] : never
  } 
    : ActivityScore
  : ActivityScore


  type ActivityScoreCountArgs = Merge<
    Omit<ActivityScoreFindManyArgs, 'select' | 'include'> & {
      select?: ActivityScoreCountAggregateInputType | true
    }
  >

  export interface ActivityScoreDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one ActivityScore that matches the filter.
     * @param {ActivityScoreFindUniqueArgs} args - Arguments to find a ActivityScore
     * @example
     * // Get one ActivityScore
     * const activityScore = await prisma.activityScore.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ActivityScoreFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, ActivityScoreFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'ActivityScore'> extends True ? CheckSelect<T, Prisma__ActivityScoreClient<ActivityScore>, Prisma__ActivityScoreClient<ActivityScoreGetPayload<T>>> : CheckSelect<T, Prisma__ActivityScoreClient<ActivityScore | null >, Prisma__ActivityScoreClient<ActivityScoreGetPayload<T> | null >>

    /**
     * Find the first ActivityScore that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityScoreFindFirstArgs} args - Arguments to find a ActivityScore
     * @example
     * // Get one ActivityScore
     * const activityScore = await prisma.activityScore.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ActivityScoreFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, ActivityScoreFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'ActivityScore'> extends True ? CheckSelect<T, Prisma__ActivityScoreClient<ActivityScore>, Prisma__ActivityScoreClient<ActivityScoreGetPayload<T>>> : CheckSelect<T, Prisma__ActivityScoreClient<ActivityScore | null >, Prisma__ActivityScoreClient<ActivityScoreGetPayload<T> | null >>

    /**
     * Find zero or more ActivityScores that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityScoreFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityScores
     * const activityScores = await prisma.activityScore.findMany()
     * 
     * // Get first 10 ActivityScores
     * const activityScores = await prisma.activityScore.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityScoreWithIdOnly = await prisma.activityScore.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ActivityScoreFindManyArgs>(
      args?: SelectSubset<T, ActivityScoreFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<ActivityScore>>, PrismaPromise<Array<ActivityScoreGetPayload<T>>>>

    /**
     * Create a ActivityScore.
     * @param {ActivityScoreCreateArgs} args - Arguments to create a ActivityScore.
     * @example
     * // Create one ActivityScore
     * const ActivityScore = await prisma.activityScore.create({
     *   data: {
     *     // ... data to create a ActivityScore
     *   }
     * })
     * 
    **/
    create<T extends ActivityScoreCreateArgs>(
      args: SelectSubset<T, ActivityScoreCreateArgs>
    ): CheckSelect<T, Prisma__ActivityScoreClient<ActivityScore>, Prisma__ActivityScoreClient<ActivityScoreGetPayload<T>>>

    /**
     * Create many ActivityScores.
     *     @param {ActivityScoreCreateManyArgs} args - Arguments to create many ActivityScores.
     *     @example
     *     // Create many ActivityScores
     *     const activityScore = await prisma.activityScore.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ActivityScoreCreateManyArgs>(
      args?: SelectSubset<T, ActivityScoreCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a ActivityScore.
     * @param {ActivityScoreDeleteArgs} args - Arguments to delete one ActivityScore.
     * @example
     * // Delete one ActivityScore
     * const ActivityScore = await prisma.activityScore.delete({
     *   where: {
     *     // ... filter to delete one ActivityScore
     *   }
     * })
     * 
    **/
    delete<T extends ActivityScoreDeleteArgs>(
      args: SelectSubset<T, ActivityScoreDeleteArgs>
    ): CheckSelect<T, Prisma__ActivityScoreClient<ActivityScore>, Prisma__ActivityScoreClient<ActivityScoreGetPayload<T>>>

    /**
     * Update one ActivityScore.
     * @param {ActivityScoreUpdateArgs} args - Arguments to update one ActivityScore.
     * @example
     * // Update one ActivityScore
     * const activityScore = await prisma.activityScore.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ActivityScoreUpdateArgs>(
      args: SelectSubset<T, ActivityScoreUpdateArgs>
    ): CheckSelect<T, Prisma__ActivityScoreClient<ActivityScore>, Prisma__ActivityScoreClient<ActivityScoreGetPayload<T>>>

    /**
     * Delete zero or more ActivityScores.
     * @param {ActivityScoreDeleteManyArgs} args - Arguments to filter ActivityScores to delete.
     * @example
     * // Delete a few ActivityScores
     * const { count } = await prisma.activityScore.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ActivityScoreDeleteManyArgs>(
      args?: SelectSubset<T, ActivityScoreDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityScoreUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityScores
     * const activityScore = await prisma.activityScore.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ActivityScoreUpdateManyArgs>(
      args: SelectSubset<T, ActivityScoreUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one ActivityScore.
     * @param {ActivityScoreUpsertArgs} args - Arguments to update or create a ActivityScore.
     * @example
     * // Update or create a ActivityScore
     * const activityScore = await prisma.activityScore.upsert({
     *   create: {
     *     // ... data to create a ActivityScore
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityScore we want to update
     *   }
     * })
    **/
    upsert<T extends ActivityScoreUpsertArgs>(
      args: SelectSubset<T, ActivityScoreUpsertArgs>
    ): CheckSelect<T, Prisma__ActivityScoreClient<ActivityScore>, Prisma__ActivityScoreClient<ActivityScoreGetPayload<T>>>

    /**
     * Find zero or more ActivityScores that matches the filter.
     * @param {ActivityScoreFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const activityScore = await prisma.activityScore.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: ActivityScoreFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a ActivityScore.
     * @param {ActivityScoreAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const activityScore = await prisma.activityScore.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: ActivityScoreAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of ActivityScores.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityScoreCountArgs} args - Arguments to filter ActivityScores to count.
     * @example
     * // Count the number of ActivityScores
     * const count = await prisma.activityScore.count({
     *   where: {
     *     // ... the filter for the ActivityScores we want to count
     *   }
     * })
    **/
    count<T extends ActivityScoreCountArgs>(
      args?: Subset<T, ActivityScoreCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityScoreCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityScoreAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityScoreAggregateArgs>(args: Subset<T, ActivityScoreAggregateArgs>): PrismaPromise<GetActivityScoreAggregateType<T>>

    /**
     * Group by ActivityScore.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityScoreGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityScoreGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityScoreGroupByArgs['orderBy'] }
        : { orderBy?: ActivityScoreGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityScoreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityScoreGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityScore.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__ActivityScoreClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * ActivityScore findUnique
   */
  export type ActivityScoreFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the ActivityScore
     * 
    **/
    select?: ActivityScoreSelect | null
    /**
     * Throw an Error if a ActivityScore can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ActivityScore to fetch.
     * 
    **/
    where: ActivityScoreWhereUniqueInput
  }


  /**
   * ActivityScore findFirst
   */
  export type ActivityScoreFindFirstArgs = {
    /**
     * Select specific fields to fetch from the ActivityScore
     * 
    **/
    select?: ActivityScoreSelect | null
    /**
     * Throw an Error if a ActivityScore can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which ActivityScore to fetch.
     * 
    **/
    where?: ActivityScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityScores to fetch.
     * 
    **/
    orderBy?: Enumerable<ActivityScoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityScores.
     * 
    **/
    cursor?: ActivityScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityScores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityScores.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityScores.
     * 
    **/
    distinct?: Enumerable<ActivityScoreScalarFieldEnum>
  }


  /**
   * ActivityScore findMany
   */
  export type ActivityScoreFindManyArgs = {
    /**
     * Select specific fields to fetch from the ActivityScore
     * 
    **/
    select?: ActivityScoreSelect | null
    /**
     * Filter, which ActivityScores to fetch.
     * 
    **/
    where?: ActivityScoreWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityScores to fetch.
     * 
    **/
    orderBy?: Enumerable<ActivityScoreOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityScores.
     * 
    **/
    cursor?: ActivityScoreWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityScores from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityScores.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ActivityScoreScalarFieldEnum>
  }


  /**
   * ActivityScore create
   */
  export type ActivityScoreCreateArgs = {
    /**
     * Select specific fields to fetch from the ActivityScore
     * 
    **/
    select?: ActivityScoreSelect | null
    /**
     * The data needed to create a ActivityScore.
     * 
    **/
    data: XOR<ActivityScoreCreateInput, ActivityScoreUncheckedCreateInput>
  }


  /**
   * ActivityScore createMany
   */
  export type ActivityScoreCreateManyArgs = {
    /**
     * The data used to create many ActivityScores.
     * 
    **/
    data: Enumerable<ActivityScoreCreateManyInput>
  }


  /**
   * ActivityScore update
   */
  export type ActivityScoreUpdateArgs = {
    /**
     * Select specific fields to fetch from the ActivityScore
     * 
    **/
    select?: ActivityScoreSelect | null
    /**
     * The data needed to update a ActivityScore.
     * 
    **/
    data: XOR<ActivityScoreUpdateInput, ActivityScoreUncheckedUpdateInput>
    /**
     * Choose, which ActivityScore to update.
     * 
    **/
    where: ActivityScoreWhereUniqueInput
  }


  /**
   * ActivityScore updateMany
   */
  export type ActivityScoreUpdateManyArgs = {
    /**
     * The data used to update ActivityScores.
     * 
    **/
    data: XOR<ActivityScoreUpdateManyMutationInput, ActivityScoreUncheckedUpdateManyInput>
    /**
     * Filter which ActivityScores to update
     * 
    **/
    where?: ActivityScoreWhereInput
  }


  /**
   * ActivityScore upsert
   */
  export type ActivityScoreUpsertArgs = {
    /**
     * Select specific fields to fetch from the ActivityScore
     * 
    **/
    select?: ActivityScoreSelect | null
    /**
     * The filter to search for the ActivityScore to update in case it exists.
     * 
    **/
    where: ActivityScoreWhereUniqueInput
    /**
     * In case the ActivityScore found by the `where` argument doesn't exist, create a new ActivityScore with this data.
     * 
    **/
    create: XOR<ActivityScoreCreateInput, ActivityScoreUncheckedCreateInput>
    /**
     * In case the ActivityScore was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<ActivityScoreUpdateInput, ActivityScoreUncheckedUpdateInput>
  }


  /**
   * ActivityScore delete
   */
  export type ActivityScoreDeleteArgs = {
    /**
     * Select specific fields to fetch from the ActivityScore
     * 
    **/
    select?: ActivityScoreSelect | null
    /**
     * Filter which ActivityScore to delete.
     * 
    **/
    where: ActivityScoreWhereUniqueInput
  }


  /**
   * ActivityScore deleteMany
   */
  export type ActivityScoreDeleteManyArgs = {
    /**
     * Filter which ActivityScores to delete
     * 
    **/
    where?: ActivityScoreWhereInput
  }


  /**
   * ActivityScore findRaw
   */
  export type ActivityScoreFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ActivityScore aggregateRaw
   */
  export type ActivityScoreAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * ActivityScore without action
   */
  export type ActivityScoreArgs = {
    /**
     * Select specific fields to fetch from the ActivityScore
     * 
    **/
    select?: ActivityScoreSelect | null
  }



  /**
   * Model UsersInteractions
   */


  export type AggregateUsersInteractions = {
    _count: UsersInteractionsCountAggregateOutputType | null
    _avg: UsersInteractionsAvgAggregateOutputType | null
    _sum: UsersInteractionsSumAggregateOutputType | null
    _min: UsersInteractionsMinAggregateOutputType | null
    _max: UsersInteractionsMaxAggregateOutputType | null
  }

  export type UsersInteractionsAvgAggregateOutputType = {
    postLikes: number | null
    commentsReply: number | null
    commentsLikes: number | null
    shares: number | null
    messages: number | null
    mentions: number | null
    reviewedItems: number | null
    profileVisits: number | null
    postSaved: number | null
    interactionScore: number | null
  }

  export type UsersInteractionsSumAggregateOutputType = {
    postLikes: number | null
    commentsReply: number | null
    commentsLikes: number | null
    shares: number | null
    messages: number | null
    mentions: number | null
    reviewedItems: number | null
    profileVisits: number | null
    postSaved: number | null
    interactionScore: number | null
  }

  export type UsersInteractionsMinAggregateOutputType = {
    id: string | null
    ownerId: string | null
    userId: string | null
    postLikes: number | null
    commentsReply: number | null
    commentsLikes: number | null
    shares: number | null
    messages: number | null
    mentions: number | null
    reviewedItems: number | null
    profileVisits: number | null
    postSaved: number | null
    interactionScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersInteractionsMaxAggregateOutputType = {
    id: string | null
    ownerId: string | null
    userId: string | null
    postLikes: number | null
    commentsReply: number | null
    commentsLikes: number | null
    shares: number | null
    messages: number | null
    mentions: number | null
    reviewedItems: number | null
    profileVisits: number | null
    postSaved: number | null
    interactionScore: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsersInteractionsCountAggregateOutputType = {
    id: number
    ownerId: number
    userId: number
    postLikes: number
    commentsReply: number
    commentsLikes: number
    shares: number
    messages: number
    mentions: number
    reviewedItems: number
    profileVisits: number
    postSaved: number
    interactionScore: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsersInteractionsAvgAggregateInputType = {
    postLikes?: true
    commentsReply?: true
    commentsLikes?: true
    shares?: true
    messages?: true
    mentions?: true
    reviewedItems?: true
    profileVisits?: true
    postSaved?: true
    interactionScore?: true
  }

  export type UsersInteractionsSumAggregateInputType = {
    postLikes?: true
    commentsReply?: true
    commentsLikes?: true
    shares?: true
    messages?: true
    mentions?: true
    reviewedItems?: true
    profileVisits?: true
    postSaved?: true
    interactionScore?: true
  }

  export type UsersInteractionsMinAggregateInputType = {
    id?: true
    ownerId?: true
    userId?: true
    postLikes?: true
    commentsReply?: true
    commentsLikes?: true
    shares?: true
    messages?: true
    mentions?: true
    reviewedItems?: true
    profileVisits?: true
    postSaved?: true
    interactionScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersInteractionsMaxAggregateInputType = {
    id?: true
    ownerId?: true
    userId?: true
    postLikes?: true
    commentsReply?: true
    commentsLikes?: true
    shares?: true
    messages?: true
    mentions?: true
    reviewedItems?: true
    profileVisits?: true
    postSaved?: true
    interactionScore?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsersInteractionsCountAggregateInputType = {
    id?: true
    ownerId?: true
    userId?: true
    postLikes?: true
    commentsReply?: true
    commentsLikes?: true
    shares?: true
    messages?: true
    mentions?: true
    reviewedItems?: true
    profileVisits?: true
    postSaved?: true
    interactionScore?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsersInteractionsAggregateArgs = {
    /**
     * Filter which UsersInteractions to aggregate.
     * 
    **/
    where?: UsersInteractionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersInteractions to fetch.
     * 
    **/
    orderBy?: Enumerable<UsersInteractionsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UsersInteractionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersInteractions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersInteractions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsersInteractions
    **/
    _count?: true | UsersInteractionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsersInteractionsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsersInteractionsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersInteractionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersInteractionsMaxAggregateInputType
  }

  export type GetUsersInteractionsAggregateType<T extends UsersInteractionsAggregateArgs> = {
        [P in keyof T & keyof AggregateUsersInteractions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsersInteractions[P]>
      : GetScalarType<T[P], AggregateUsersInteractions[P]>
  }




  export type UsersInteractionsGroupByArgs = {
    where?: UsersInteractionsWhereInput
    orderBy?: Enumerable<UsersInteractionsOrderByWithAggregationInput>
    by: Array<UsersInteractionsScalarFieldEnum>
    having?: UsersInteractionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersInteractionsCountAggregateInputType | true
    _avg?: UsersInteractionsAvgAggregateInputType
    _sum?: UsersInteractionsSumAggregateInputType
    _min?: UsersInteractionsMinAggregateInputType
    _max?: UsersInteractionsMaxAggregateInputType
  }


  export type UsersInteractionsGroupByOutputType = {
    id: string
    ownerId: string
    userId: string
    postLikes: number
    commentsReply: number
    commentsLikes: number
    shares: number
    messages: number
    mentions: number
    reviewedItems: number
    profileVisits: number
    postSaved: number
    interactionScore: number
    createdAt: Date
    updatedAt: Date
    _count: UsersInteractionsCountAggregateOutputType | null
    _avg: UsersInteractionsAvgAggregateOutputType | null
    _sum: UsersInteractionsSumAggregateOutputType | null
    _min: UsersInteractionsMinAggregateOutputType | null
    _max: UsersInteractionsMaxAggregateOutputType | null
  }

  type GetUsersInteractionsGroupByPayload<T extends UsersInteractionsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UsersInteractionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersInteractionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersInteractionsGroupByOutputType[P]>
            : GetScalarType<T[P], UsersInteractionsGroupByOutputType[P]>
        }
      >
    >


  export type UsersInteractionsSelect = {
    id?: boolean
    ownerId?: boolean
    userId?: boolean
    postLikes?: boolean
    commentsReply?: boolean
    commentsLikes?: boolean
    shares?: boolean
    messages?: boolean
    mentions?: boolean
    reviewedItems?: boolean
    profileVisits?: boolean
    postSaved?: boolean
    interactionScore?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsersInteractionsGetPayload<
    S extends boolean | null | undefined | UsersInteractionsArgs,
    U = keyof S
      > = S extends true
        ? UsersInteractions
    : S extends undefined
    ? never
    : S extends UsersInteractionsArgs | UsersInteractionsFindManyArgs
    ?'include' extends U
    ? UsersInteractions 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UsersInteractions ? UsersInteractions[P] : never
  } 
    : UsersInteractions
  : UsersInteractions


  type UsersInteractionsCountArgs = Merge<
    Omit<UsersInteractionsFindManyArgs, 'select' | 'include'> & {
      select?: UsersInteractionsCountAggregateInputType | true
    }
  >

  export interface UsersInteractionsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one UsersInteractions that matches the filter.
     * @param {UsersInteractionsFindUniqueArgs} args - Arguments to find a UsersInteractions
     * @example
     * // Get one UsersInteractions
     * const usersInteractions = await prisma.usersInteractions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UsersInteractionsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UsersInteractionsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UsersInteractions'> extends True ? CheckSelect<T, Prisma__UsersInteractionsClient<UsersInteractions>, Prisma__UsersInteractionsClient<UsersInteractionsGetPayload<T>>> : CheckSelect<T, Prisma__UsersInteractionsClient<UsersInteractions | null >, Prisma__UsersInteractionsClient<UsersInteractionsGetPayload<T> | null >>

    /**
     * Find the first UsersInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersInteractionsFindFirstArgs} args - Arguments to find a UsersInteractions
     * @example
     * // Get one UsersInteractions
     * const usersInteractions = await prisma.usersInteractions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UsersInteractionsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UsersInteractionsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UsersInteractions'> extends True ? CheckSelect<T, Prisma__UsersInteractionsClient<UsersInteractions>, Prisma__UsersInteractionsClient<UsersInteractionsGetPayload<T>>> : CheckSelect<T, Prisma__UsersInteractionsClient<UsersInteractions | null >, Prisma__UsersInteractionsClient<UsersInteractionsGetPayload<T> | null >>

    /**
     * Find zero or more UsersInteractions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersInteractionsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsersInteractions
     * const usersInteractions = await prisma.usersInteractions.findMany()
     * 
     * // Get first 10 UsersInteractions
     * const usersInteractions = await prisma.usersInteractions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersInteractionsWithIdOnly = await prisma.usersInteractions.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UsersInteractionsFindManyArgs>(
      args?: SelectSubset<T, UsersInteractionsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<UsersInteractions>>, PrismaPromise<Array<UsersInteractionsGetPayload<T>>>>

    /**
     * Create a UsersInteractions.
     * @param {UsersInteractionsCreateArgs} args - Arguments to create a UsersInteractions.
     * @example
     * // Create one UsersInteractions
     * const UsersInteractions = await prisma.usersInteractions.create({
     *   data: {
     *     // ... data to create a UsersInteractions
     *   }
     * })
     * 
    **/
    create<T extends UsersInteractionsCreateArgs>(
      args: SelectSubset<T, UsersInteractionsCreateArgs>
    ): CheckSelect<T, Prisma__UsersInteractionsClient<UsersInteractions>, Prisma__UsersInteractionsClient<UsersInteractionsGetPayload<T>>>

    /**
     * Create many UsersInteractions.
     *     @param {UsersInteractionsCreateManyArgs} args - Arguments to create many UsersInteractions.
     *     @example
     *     // Create many UsersInteractions
     *     const usersInteractions = await prisma.usersInteractions.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UsersInteractionsCreateManyArgs>(
      args?: SelectSubset<T, UsersInteractionsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a UsersInteractions.
     * @param {UsersInteractionsDeleteArgs} args - Arguments to delete one UsersInteractions.
     * @example
     * // Delete one UsersInteractions
     * const UsersInteractions = await prisma.usersInteractions.delete({
     *   where: {
     *     // ... filter to delete one UsersInteractions
     *   }
     * })
     * 
    **/
    delete<T extends UsersInteractionsDeleteArgs>(
      args: SelectSubset<T, UsersInteractionsDeleteArgs>
    ): CheckSelect<T, Prisma__UsersInteractionsClient<UsersInteractions>, Prisma__UsersInteractionsClient<UsersInteractionsGetPayload<T>>>

    /**
     * Update one UsersInteractions.
     * @param {UsersInteractionsUpdateArgs} args - Arguments to update one UsersInteractions.
     * @example
     * // Update one UsersInteractions
     * const usersInteractions = await prisma.usersInteractions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UsersInteractionsUpdateArgs>(
      args: SelectSubset<T, UsersInteractionsUpdateArgs>
    ): CheckSelect<T, Prisma__UsersInteractionsClient<UsersInteractions>, Prisma__UsersInteractionsClient<UsersInteractionsGetPayload<T>>>

    /**
     * Delete zero or more UsersInteractions.
     * @param {UsersInteractionsDeleteManyArgs} args - Arguments to filter UsersInteractions to delete.
     * @example
     * // Delete a few UsersInteractions
     * const { count } = await prisma.usersInteractions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UsersInteractionsDeleteManyArgs>(
      args?: SelectSubset<T, UsersInteractionsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsersInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersInteractionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsersInteractions
     * const usersInteractions = await prisma.usersInteractions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UsersInteractionsUpdateManyArgs>(
      args: SelectSubset<T, UsersInteractionsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one UsersInteractions.
     * @param {UsersInteractionsUpsertArgs} args - Arguments to update or create a UsersInteractions.
     * @example
     * // Update or create a UsersInteractions
     * const usersInteractions = await prisma.usersInteractions.upsert({
     *   create: {
     *     // ... data to create a UsersInteractions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsersInteractions we want to update
     *   }
     * })
    **/
    upsert<T extends UsersInteractionsUpsertArgs>(
      args: SelectSubset<T, UsersInteractionsUpsertArgs>
    ): CheckSelect<T, Prisma__UsersInteractionsClient<UsersInteractions>, Prisma__UsersInteractionsClient<UsersInteractionsGetPayload<T>>>

    /**
     * Find zero or more UsersInteractions that matches the filter.
     * @param {UsersInteractionsFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const usersInteractions = await prisma.usersInteractions.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UsersInteractionsFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UsersInteractions.
     * @param {UsersInteractionsAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const usersInteractions = await prisma.usersInteractions.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UsersInteractionsAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of UsersInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersInteractionsCountArgs} args - Arguments to filter UsersInteractions to count.
     * @example
     * // Count the number of UsersInteractions
     * const count = await prisma.usersInteractions.count({
     *   where: {
     *     // ... the filter for the UsersInteractions we want to count
     *   }
     * })
    **/
    count<T extends UsersInteractionsCountArgs>(
      args?: Subset<T, UsersInteractionsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersInteractionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsersInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersInteractionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersInteractionsAggregateArgs>(args: Subset<T, UsersInteractionsAggregateArgs>): PrismaPromise<GetUsersInteractionsAggregateType<T>>

    /**
     * Group by UsersInteractions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersInteractionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersInteractionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersInteractionsGroupByArgs['orderBy'] }
        : { orderBy?: UsersInteractionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersInteractionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersInteractionsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsersInteractions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UsersInteractionsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * UsersInteractions findUnique
   */
  export type UsersInteractionsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the UsersInteractions
     * 
    **/
    select?: UsersInteractionsSelect | null
    /**
     * Throw an Error if a UsersInteractions can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UsersInteractions to fetch.
     * 
    **/
    where: UsersInteractionsWhereUniqueInput
  }


  /**
   * UsersInteractions findFirst
   */
  export type UsersInteractionsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the UsersInteractions
     * 
    **/
    select?: UsersInteractionsSelect | null
    /**
     * Throw an Error if a UsersInteractions can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UsersInteractions to fetch.
     * 
    **/
    where?: UsersInteractionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersInteractions to fetch.
     * 
    **/
    orderBy?: Enumerable<UsersInteractionsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsersInteractions.
     * 
    **/
    cursor?: UsersInteractionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersInteractions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersInteractions.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsersInteractions.
     * 
    **/
    distinct?: Enumerable<UsersInteractionsScalarFieldEnum>
  }


  /**
   * UsersInteractions findMany
   */
  export type UsersInteractionsFindManyArgs = {
    /**
     * Select specific fields to fetch from the UsersInteractions
     * 
    **/
    select?: UsersInteractionsSelect | null
    /**
     * Filter, which UsersInteractions to fetch.
     * 
    **/
    where?: UsersInteractionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsersInteractions to fetch.
     * 
    **/
    orderBy?: Enumerable<UsersInteractionsOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsersInteractions.
     * 
    **/
    cursor?: UsersInteractionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsersInteractions from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsersInteractions.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UsersInteractionsScalarFieldEnum>
  }


  /**
   * UsersInteractions create
   */
  export type UsersInteractionsCreateArgs = {
    /**
     * Select specific fields to fetch from the UsersInteractions
     * 
    **/
    select?: UsersInteractionsSelect | null
    /**
     * The data needed to create a UsersInteractions.
     * 
    **/
    data: XOR<UsersInteractionsCreateInput, UsersInteractionsUncheckedCreateInput>
  }


  /**
   * UsersInteractions createMany
   */
  export type UsersInteractionsCreateManyArgs = {
    /**
     * The data used to create many UsersInteractions.
     * 
    **/
    data: Enumerable<UsersInteractionsCreateManyInput>
  }


  /**
   * UsersInteractions update
   */
  export type UsersInteractionsUpdateArgs = {
    /**
     * Select specific fields to fetch from the UsersInteractions
     * 
    **/
    select?: UsersInteractionsSelect | null
    /**
     * The data needed to update a UsersInteractions.
     * 
    **/
    data: XOR<UsersInteractionsUpdateInput, UsersInteractionsUncheckedUpdateInput>
    /**
     * Choose, which UsersInteractions to update.
     * 
    **/
    where: UsersInteractionsWhereUniqueInput
  }


  /**
   * UsersInteractions updateMany
   */
  export type UsersInteractionsUpdateManyArgs = {
    /**
     * The data used to update UsersInteractions.
     * 
    **/
    data: XOR<UsersInteractionsUpdateManyMutationInput, UsersInteractionsUncheckedUpdateManyInput>
    /**
     * Filter which UsersInteractions to update
     * 
    **/
    where?: UsersInteractionsWhereInput
  }


  /**
   * UsersInteractions upsert
   */
  export type UsersInteractionsUpsertArgs = {
    /**
     * Select specific fields to fetch from the UsersInteractions
     * 
    **/
    select?: UsersInteractionsSelect | null
    /**
     * The filter to search for the UsersInteractions to update in case it exists.
     * 
    **/
    where: UsersInteractionsWhereUniqueInput
    /**
     * In case the UsersInteractions found by the `where` argument doesn't exist, create a new UsersInteractions with this data.
     * 
    **/
    create: XOR<UsersInteractionsCreateInput, UsersInteractionsUncheckedCreateInput>
    /**
     * In case the UsersInteractions was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UsersInteractionsUpdateInput, UsersInteractionsUncheckedUpdateInput>
  }


  /**
   * UsersInteractions delete
   */
  export type UsersInteractionsDeleteArgs = {
    /**
     * Select specific fields to fetch from the UsersInteractions
     * 
    **/
    select?: UsersInteractionsSelect | null
    /**
     * Filter which UsersInteractions to delete.
     * 
    **/
    where: UsersInteractionsWhereUniqueInput
  }


  /**
   * UsersInteractions deleteMany
   */
  export type UsersInteractionsDeleteManyArgs = {
    /**
     * Filter which UsersInteractions to delete
     * 
    **/
    where?: UsersInteractionsWhereInput
  }


  /**
   * UsersInteractions findRaw
   */
  export type UsersInteractionsFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * UsersInteractions aggregateRaw
   */
  export type UsersInteractionsAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * UsersInteractions without action
   */
  export type UsersInteractionsArgs = {
    /**
     * Select specific fields to fetch from the UsersInteractions
     * 
    **/
    select?: UsersInteractionsSelect | null
  }



  /**
   * Model UserInterest
   */


  export type AggregateUserInterest = {
    _count: UserInterestCountAggregateOutputType | null
    _min: UserInterestMinAggregateOutputType | null
    _max: UserInterestMaxAggregateOutputType | null
  }

  export type UserInterestMinAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type UserInterestMaxAggregateOutputType = {
    id: string | null
    userId: string | null
  }

  export type UserInterestCountAggregateOutputType = {
    id: number
    userId: number
    _all: number
  }


  export type UserInterestMinAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserInterestMaxAggregateInputType = {
    id?: true
    userId?: true
  }

  export type UserInterestCountAggregateInputType = {
    id?: true
    userId?: true
    _all?: true
  }

  export type UserInterestAggregateArgs = {
    /**
     * Filter which UserInterest to aggregate.
     * 
    **/
    where?: UserInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInterests to fetch.
     * 
    **/
    orderBy?: Enumerable<UserInterestOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: UserInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInterests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInterests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserInterests
    **/
    _count?: true | UserInterestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserInterestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserInterestMaxAggregateInputType
  }

  export type GetUserInterestAggregateType<T extends UserInterestAggregateArgs> = {
        [P in keyof T & keyof AggregateUserInterest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserInterest[P]>
      : GetScalarType<T[P], AggregateUserInterest[P]>
  }




  export type UserInterestGroupByArgs = {
    where?: UserInterestWhereInput
    orderBy?: Enumerable<UserInterestOrderByWithAggregationInput>
    by: Array<UserInterestScalarFieldEnum>
    having?: UserInterestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserInterestCountAggregateInputType | true
    _min?: UserInterestMinAggregateInputType
    _max?: UserInterestMaxAggregateInputType
  }


  export type UserInterestGroupByOutputType = {
    id: string
    userId: string
    _count: UserInterestCountAggregateOutputType | null
    _min: UserInterestMinAggregateOutputType | null
    _max: UserInterestMaxAggregateOutputType | null
  }

  type GetUserInterestGroupByPayload<T extends UserInterestGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UserInterestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserInterestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserInterestGroupByOutputType[P]>
            : GetScalarType<T[P], UserInterestGroupByOutputType[P]>
        }
      >
    >


  export type UserInterestSelect = {
    id?: boolean
    userId?: boolean
    keywords?: boolean | UserInterestKeywordArgs
  }

  export type UserInterestInclude = {

  }

  export type UserInterestGetPayload<
    S extends boolean | null | undefined | UserInterestArgs,
    U = keyof S
      > = S extends true
        ? UserInterest
    : S extends undefined
    ? never
    : S extends UserInterestArgs | UserInterestFindManyArgs
    ?'include' extends U
    ? UserInterest  & {
    [P in TrueKeys<S['include']>]:
        P extends 'keywords' ? Array < UserInterestKeywordGetPayload<S['include'][P]>>  :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'keywords' ? Array < UserInterestKeywordGetPayload<S['select'][P]>>  :  P extends keyof UserInterest ? UserInterest[P] : never
  } 
    : UserInterest
  : UserInterest


  type UserInterestCountArgs = Merge<
    Omit<UserInterestFindManyArgs, 'select' | 'include'> & {
      select?: UserInterestCountAggregateInputType | true
    }
  >

  export interface UserInterestDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one UserInterest that matches the filter.
     * @param {UserInterestFindUniqueArgs} args - Arguments to find a UserInterest
     * @example
     * // Get one UserInterest
     * const userInterest = await prisma.userInterest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserInterestFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, UserInterestFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'UserInterest'> extends True ? CheckSelect<T, Prisma__UserInterestClient<UserInterest>, Prisma__UserInterestClient<UserInterestGetPayload<T>>> : CheckSelect<T, Prisma__UserInterestClient<UserInterest | null >, Prisma__UserInterestClient<UserInterestGetPayload<T> | null >>

    /**
     * Find the first UserInterest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestFindFirstArgs} args - Arguments to find a UserInterest
     * @example
     * // Get one UserInterest
     * const userInterest = await prisma.userInterest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserInterestFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, UserInterestFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'UserInterest'> extends True ? CheckSelect<T, Prisma__UserInterestClient<UserInterest>, Prisma__UserInterestClient<UserInterestGetPayload<T>>> : CheckSelect<T, Prisma__UserInterestClient<UserInterest | null >, Prisma__UserInterestClient<UserInterestGetPayload<T> | null >>

    /**
     * Find zero or more UserInterests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserInterests
     * const userInterests = await prisma.userInterest.findMany()
     * 
     * // Get first 10 UserInterests
     * const userInterests = await prisma.userInterest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userInterestWithIdOnly = await prisma.userInterest.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserInterestFindManyArgs>(
      args?: SelectSubset<T, UserInterestFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<UserInterest>>, PrismaPromise<Array<UserInterestGetPayload<T>>>>

    /**
     * Create a UserInterest.
     * @param {UserInterestCreateArgs} args - Arguments to create a UserInterest.
     * @example
     * // Create one UserInterest
     * const UserInterest = await prisma.userInterest.create({
     *   data: {
     *     // ... data to create a UserInterest
     *   }
     * })
     * 
    **/
    create<T extends UserInterestCreateArgs>(
      args: SelectSubset<T, UserInterestCreateArgs>
    ): CheckSelect<T, Prisma__UserInterestClient<UserInterest>, Prisma__UserInterestClient<UserInterestGetPayload<T>>>

    /**
     * Create many UserInterests.
     *     @param {UserInterestCreateManyArgs} args - Arguments to create many UserInterests.
     *     @example
     *     // Create many UserInterests
     *     const userInterest = await prisma.userInterest.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserInterestCreateManyArgs>(
      args?: SelectSubset<T, UserInterestCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a UserInterest.
     * @param {UserInterestDeleteArgs} args - Arguments to delete one UserInterest.
     * @example
     * // Delete one UserInterest
     * const UserInterest = await prisma.userInterest.delete({
     *   where: {
     *     // ... filter to delete one UserInterest
     *   }
     * })
     * 
    **/
    delete<T extends UserInterestDeleteArgs>(
      args: SelectSubset<T, UserInterestDeleteArgs>
    ): CheckSelect<T, Prisma__UserInterestClient<UserInterest>, Prisma__UserInterestClient<UserInterestGetPayload<T>>>

    /**
     * Update one UserInterest.
     * @param {UserInterestUpdateArgs} args - Arguments to update one UserInterest.
     * @example
     * // Update one UserInterest
     * const userInterest = await prisma.userInterest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserInterestUpdateArgs>(
      args: SelectSubset<T, UserInterestUpdateArgs>
    ): CheckSelect<T, Prisma__UserInterestClient<UserInterest>, Prisma__UserInterestClient<UserInterestGetPayload<T>>>

    /**
     * Delete zero or more UserInterests.
     * @param {UserInterestDeleteManyArgs} args - Arguments to filter UserInterests to delete.
     * @example
     * // Delete a few UserInterests
     * const { count } = await prisma.userInterest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserInterestDeleteManyArgs>(
      args?: SelectSubset<T, UserInterestDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserInterests
     * const userInterest = await prisma.userInterest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserInterestUpdateManyArgs>(
      args: SelectSubset<T, UserInterestUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one UserInterest.
     * @param {UserInterestUpsertArgs} args - Arguments to update or create a UserInterest.
     * @example
     * // Update or create a UserInterest
     * const userInterest = await prisma.userInterest.upsert({
     *   create: {
     *     // ... data to create a UserInterest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserInterest we want to update
     *   }
     * })
    **/
    upsert<T extends UserInterestUpsertArgs>(
      args: SelectSubset<T, UserInterestUpsertArgs>
    ): CheckSelect<T, Prisma__UserInterestClient<UserInterest>, Prisma__UserInterestClient<UserInterestGetPayload<T>>>

    /**
     * Find zero or more UserInterests that matches the filter.
     * @param {UserInterestFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const userInterest = await prisma.userInterest.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: UserInterestFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a UserInterest.
     * @param {UserInterestAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const userInterest = await prisma.userInterest.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: UserInterestAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of UserInterests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestCountArgs} args - Arguments to filter UserInterests to count.
     * @example
     * // Count the number of UserInterests
     * const count = await prisma.userInterest.count({
     *   where: {
     *     // ... the filter for the UserInterests we want to count
     *   }
     * })
    **/
    count<T extends UserInterestCountArgs>(
      args?: Subset<T, UserInterestCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserInterestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserInterestAggregateArgs>(args: Subset<T, UserInterestAggregateArgs>): PrismaPromise<GetUserInterestAggregateType<T>>

    /**
     * Group by UserInterest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserInterestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserInterestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserInterestGroupByArgs['orderBy'] }
        : { orderBy?: UserInterestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserInterestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserInterestGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserInterest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__UserInterestClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    keywords<T extends UserInterestKeywordArgs = {}>(args?: Subset<T, UserInterestKeywordArgs>): CheckSelect<T, PrismaPromise<Array<UserInterestKeyword>>, PrismaPromise<Array<UserInterestKeywordGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * UserInterest findUnique
   */
  export type UserInterestFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the UserInterest
     * 
    **/
    select?: UserInterestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInterestInclude | null
    /**
     * Throw an Error if a UserInterest can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UserInterest to fetch.
     * 
    **/
    where: UserInterestWhereUniqueInput
  }


  /**
   * UserInterest findFirst
   */
  export type UserInterestFindFirstArgs = {
    /**
     * Select specific fields to fetch from the UserInterest
     * 
    **/
    select?: UserInterestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInterestInclude | null
    /**
     * Throw an Error if a UserInterest can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which UserInterest to fetch.
     * 
    **/
    where?: UserInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInterests to fetch.
     * 
    **/
    orderBy?: Enumerable<UserInterestOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserInterests.
     * 
    **/
    cursor?: UserInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInterests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInterests.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserInterests.
     * 
    **/
    distinct?: Enumerable<UserInterestScalarFieldEnum>
  }


  /**
   * UserInterest findMany
   */
  export type UserInterestFindManyArgs = {
    /**
     * Select specific fields to fetch from the UserInterest
     * 
    **/
    select?: UserInterestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInterestInclude | null
    /**
     * Filter, which UserInterests to fetch.
     * 
    **/
    where?: UserInterestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserInterests to fetch.
     * 
    **/
    orderBy?: Enumerable<UserInterestOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserInterests.
     * 
    **/
    cursor?: UserInterestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserInterests from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserInterests.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UserInterestScalarFieldEnum>
  }


  /**
   * UserInterest create
   */
  export type UserInterestCreateArgs = {
    /**
     * Select specific fields to fetch from the UserInterest
     * 
    **/
    select?: UserInterestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInterestInclude | null
    /**
     * The data needed to create a UserInterest.
     * 
    **/
    data: XOR<UserInterestCreateInput, UserInterestUncheckedCreateInput>
  }


  /**
   * UserInterest createMany
   */
  export type UserInterestCreateManyArgs = {
    /**
     * The data used to create many UserInterests.
     * 
    **/
    data: Enumerable<UserInterestCreateManyInput>
  }


  /**
   * UserInterest update
   */
  export type UserInterestUpdateArgs = {
    /**
     * Select specific fields to fetch from the UserInterest
     * 
    **/
    select?: UserInterestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInterestInclude | null
    /**
     * The data needed to update a UserInterest.
     * 
    **/
    data: XOR<UserInterestUpdateInput, UserInterestUncheckedUpdateInput>
    /**
     * Choose, which UserInterest to update.
     * 
    **/
    where: UserInterestWhereUniqueInput
  }


  /**
   * UserInterest updateMany
   */
  export type UserInterestUpdateManyArgs = {
    /**
     * The data used to update UserInterests.
     * 
    **/
    data: XOR<UserInterestUpdateManyMutationInput, UserInterestUncheckedUpdateManyInput>
    /**
     * Filter which UserInterests to update
     * 
    **/
    where?: UserInterestWhereInput
  }


  /**
   * UserInterest upsert
   */
  export type UserInterestUpsertArgs = {
    /**
     * Select specific fields to fetch from the UserInterest
     * 
    **/
    select?: UserInterestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInterestInclude | null
    /**
     * The filter to search for the UserInterest to update in case it exists.
     * 
    **/
    where: UserInterestWhereUniqueInput
    /**
     * In case the UserInterest found by the `where` argument doesn't exist, create a new UserInterest with this data.
     * 
    **/
    create: XOR<UserInterestCreateInput, UserInterestUncheckedCreateInput>
    /**
     * In case the UserInterest was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<UserInterestUpdateInput, UserInterestUncheckedUpdateInput>
  }


  /**
   * UserInterest delete
   */
  export type UserInterestDeleteArgs = {
    /**
     * Select specific fields to fetch from the UserInterest
     * 
    **/
    select?: UserInterestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInterestInclude | null
    /**
     * Filter which UserInterest to delete.
     * 
    **/
    where: UserInterestWhereUniqueInput
  }


  /**
   * UserInterest deleteMany
   */
  export type UserInterestDeleteManyArgs = {
    /**
     * Filter which UserInterests to delete
     * 
    **/
    where?: UserInterestWhereInput
  }


  /**
   * UserInterest findRaw
   */
  export type UserInterestFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * UserInterest aggregateRaw
   */
  export type UserInterestAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * UserInterest without action
   */
  export type UserInterestArgs = {
    /**
     * Select specific fields to fetch from the UserInterest
     * 
    **/
    select?: UserInterestSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: UserInterestInclude | null
  }



  /**
   * Model Event
   */


  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventMinAggregateOutputType = {
    id: string | null
    key: string | null
    causedById: string | null
    causedToId: string | null
  }

  export type EventMaxAggregateOutputType = {
    id: string | null
    key: string | null
    causedById: string | null
    causedToId: string | null
  }

  export type EventCountAggregateOutputType = {
    id: number
    key: number
    causedById: number
    causedToId: number
    _all: number
  }


  export type EventMinAggregateInputType = {
    id?: true
    key?: true
    causedById?: true
    causedToId?: true
  }

  export type EventMaxAggregateInputType = {
    id?: true
    key?: true
    causedById?: true
    causedToId?: true
  }

  export type EventCountAggregateInputType = {
    id?: true
    key?: true
    causedById?: true
    causedToId?: true
    _all?: true
  }

  export type EventAggregateArgs = {
    /**
     * Filter which Event to aggregate.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs = {
    where?: EventWhereInput
    orderBy?: Enumerable<EventOrderByWithAggregationInput>
    by: Array<EventScalarFieldEnum>
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }


  export type EventGroupByOutputType = {
    id: string
    key: string
    causedById: string
    causedToId: string | null
    _count: EventCountAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = PrismaPromise<
    Array<
      PickArray<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect = {
    id?: boolean
    key?: boolean
    causedById?: boolean
    causedToId?: boolean
  }

  export type EventGetPayload<
    S extends boolean | null | undefined | EventArgs,
    U = keyof S
      > = S extends true
        ? Event
    : S extends undefined
    ? never
    : S extends EventArgs | EventFindManyArgs
    ?'include' extends U
    ? Event 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Event ? Event[P] : never
  } 
    : Event
  : Event


  type EventCountArgs = Merge<
    Omit<EventFindManyArgs, 'select' | 'include'> & {
      select?: EventCountAggregateInputType | true
    }
  >

  export interface EventDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends EventFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, EventFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'Event'> extends True ? CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>> : CheckSelect<T, Prisma__EventClient<Event | null >, Prisma__EventClient<EventGetPayload<T> | null >>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends EventFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, EventFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'Event'> extends True ? CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>> : CheckSelect<T, Prisma__EventClient<Event | null >, Prisma__EventClient<EventGetPayload<T> | null >>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const eventWithIdOnly = await prisma.event.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends EventFindManyArgs>(
      args?: SelectSubset<T, EventFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<Event>>, PrismaPromise<Array<EventGetPayload<T>>>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
    **/
    create<T extends EventCreateArgs>(
      args: SelectSubset<T, EventCreateArgs>
    ): CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>>

    /**
     * Create many Events.
     *     @param {EventCreateManyArgs} args - Arguments to create many Events.
     *     @example
     *     // Create many Events
     *     const event = await prisma.event.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends EventCreateManyArgs>(
      args?: SelectSubset<T, EventCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
    **/
    delete<T extends EventDeleteArgs>(
      args: SelectSubset<T, EventDeleteArgs>
    ): CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends EventUpdateArgs>(
      args: SelectSubset<T, EventUpdateArgs>
    ): CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends EventDeleteManyArgs>(
      args?: SelectSubset<T, EventDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends EventUpdateManyArgs>(
      args: SelectSubset<T, EventUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
    **/
    upsert<T extends EventUpsertArgs>(
      args: SelectSubset<T, EventUpsertArgs>
    ): CheckSelect<T, Prisma__EventClient<Event>, Prisma__EventClient<EventGetPayload<T>>>

    /**
     * Find zero or more Events that matches the filter.
     * @param {EventFindRawArgs} args - Select which filters you would like to apply.
     * @example
     * const event = await prisma.event.findRaw({
     *   filter: { age: { $gt: 25 } } 
     * })
    **/
    findRaw(
      args?: EventFindRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Perform aggregation operations on a Event.
     * @param {EventAggregateRawArgs} args - Select which aggregations you would like to apply.
     * @example
     * const event = await prisma.event.aggregateRaw({
     *   pipeline: [
     *     { $match: { status: "registered" } },
     *     { $group: { _id: "$country", total: { $sum: 1 } } }
     *   ]
     * })
    **/
    aggregateRaw(
      args?: EventAggregateRawArgs
    ): PrismaPromise<JsonObject>

    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__EventClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Throw an Error if a Event can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Event to fetch.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event findFirst
   */
  export type EventFindFirstArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Throw an Error if a Event can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which Event to fetch.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     * 
    **/
    distinct?: Enumerable<EventScalarFieldEnum>
  }


  /**
   * Event findMany
   */
  export type EventFindManyArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Filter, which Events to fetch.
     * 
    **/
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     * 
    **/
    orderBy?: Enumerable<EventOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     * 
    **/
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     * 
    **/
    skip?: number
    distinct?: Enumerable<EventScalarFieldEnum>
  }


  /**
   * Event create
   */
  export type EventCreateArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * The data needed to create a Event.
     * 
    **/
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }


  /**
   * Event createMany
   */
  export type EventCreateManyArgs = {
    /**
     * The data used to create many Events.
     * 
    **/
    data: Enumerable<EventCreateManyInput>
  }


  /**
   * Event update
   */
  export type EventUpdateArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * The data needed to update a Event.
     * 
    **/
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs = {
    /**
     * The data used to update Events.
     * 
    **/
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     * 
    **/
    where?: EventWhereInput
  }


  /**
   * Event upsert
   */
  export type EventUpsertArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * The filter to search for the Event to update in case it exists.
     * 
    **/
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     * 
    **/
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }


  /**
   * Event delete
   */
  export type EventDeleteArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
    /**
     * Filter which Event to delete.
     * 
    **/
    where: EventWhereUniqueInput
  }


  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs = {
    /**
     * Filter which Events to delete
     * 
    **/
    where?: EventWhereInput
  }


  /**
   * Event findRaw
   */
  export type EventFindRawArgs = {
    /**
     * The query predicate filter. If unspecified, then all documents in the collection will match the predicate. ${@link https://docs.mongodb.com/manual/reference/operator/query MongoDB Docs}.
     * 
    **/
    filter?: InputJsonValue
    /**
     * Additional options to pass to the `find` command ${@link https://docs.mongodb.com/manual/reference/command/find/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Event aggregateRaw
   */
  export type EventAggregateRawArgs = {
    /**
     * An array of aggregation stages to process and transform the document stream via the aggregation pipeline. ${@link https://docs.mongodb.com/manual/reference/operator/aggregation-pipeline MongoDB Docs}.
     * 
    **/
    pipeline?: Array<InputJsonValue>
    /**
     * Additional options to pass to the `aggregate` command ${@link https://docs.mongodb.com/manual/reference/command/aggregate/#command-fields MongoDB Docs}.
     * 
    **/
    options?: InputJsonValue
  }


  /**
   * Event without action
   */
  export type EventArgs = {
    /**
     * Select specific fields to fetch from the Event
     * 
    **/
    select?: EventSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UserActivityStatsScalarFieldEnum: {
    id: 'id',
    activityScore: 'activityScore',
    lastActive: 'lastActive',
    day_active_min: 'day_active_min',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserActivityStatsScalarFieldEnum = (typeof UserActivityStatsScalarFieldEnum)[keyof typeof UserActivityStatsScalarFieldEnum]


  export const ActivityScoreScalarFieldEnum: {
    id: 'id',
    score: 'score'
  };

  export type ActivityScoreScalarFieldEnum = (typeof ActivityScoreScalarFieldEnum)[keyof typeof ActivityScoreScalarFieldEnum]


  export const UsersInteractionsScalarFieldEnum: {
    id: 'id',
    ownerId: 'ownerId',
    userId: 'userId',
    postLikes: 'postLikes',
    commentsReply: 'commentsReply',
    commentsLikes: 'commentsLikes',
    shares: 'shares',
    messages: 'messages',
    mentions: 'mentions',
    reviewedItems: 'reviewedItems',
    profileVisits: 'profileVisits',
    postSaved: 'postSaved',
    interactionScore: 'interactionScore',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsersInteractionsScalarFieldEnum = (typeof UsersInteractionsScalarFieldEnum)[keyof typeof UsersInteractionsScalarFieldEnum]


  export const UserInterestScalarFieldEnum: {
    id: 'id',
    userId: 'userId'
  };

  export type UserInterestScalarFieldEnum = (typeof UserInterestScalarFieldEnum)[keyof typeof UserInterestScalarFieldEnum]


  export const EventScalarFieldEnum: {
    id: 'id',
    key: 'key',
    causedById: 'causedById',
    causedToId: 'causedToId'
  };

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Deep Input Types
   */


  export type UserActivityStatsWhereInput = {
    AND?: Enumerable<UserActivityStatsWhereInput>
    OR?: Enumerable<UserActivityStatsWhereInput>
    NOT?: Enumerable<UserActivityStatsWhereInput>
    id?: StringFilter | string
    activityScore?: FloatFilter | number
    lastActive?: DateTimeNullableFilter | Date | string | null
    day_active_min?: IntFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UserActivityStatsOrderByWithRelationInput = {
    id?: SortOrder
    activityScore?: SortOrder
    lastActive?: SortOrder
    day_active_min?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserActivityStatsWhereUniqueInput = {
    id?: string
  }

  export type UserActivityStatsOrderByWithAggregationInput = {
    id?: SortOrder
    activityScore?: SortOrder
    lastActive?: SortOrder
    day_active_min?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserActivityStatsCountOrderByAggregateInput
    _avg?: UserActivityStatsAvgOrderByAggregateInput
    _max?: UserActivityStatsMaxOrderByAggregateInput
    _min?: UserActivityStatsMinOrderByAggregateInput
    _sum?: UserActivityStatsSumOrderByAggregateInput
  }

  export type UserActivityStatsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserActivityStatsScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserActivityStatsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserActivityStatsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    activityScore?: FloatWithAggregatesFilter | number
    lastActive?: DateTimeNullableWithAggregatesFilter | Date | string | null
    day_active_min?: IntWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type ActivityScoreWhereInput = {
    AND?: Enumerable<ActivityScoreWhereInput>
    OR?: Enumerable<ActivityScoreWhereInput>
    NOT?: Enumerable<ActivityScoreWhereInput>
    id?: StringFilter | string
    score?: FloatFilter | number
  }

  export type ActivityScoreOrderByWithRelationInput = {
    id?: SortOrder
    score?: SortOrder
  }

  export type ActivityScoreWhereUniqueInput = {
    id?: string
  }

  export type ActivityScoreOrderByWithAggregationInput = {
    id?: SortOrder
    score?: SortOrder
    _count?: ActivityScoreCountOrderByAggregateInput
    _avg?: ActivityScoreAvgOrderByAggregateInput
    _max?: ActivityScoreMaxOrderByAggregateInput
    _min?: ActivityScoreMinOrderByAggregateInput
    _sum?: ActivityScoreSumOrderByAggregateInput
  }

  export type ActivityScoreScalarWhereWithAggregatesInput = {
    AND?: Enumerable<ActivityScoreScalarWhereWithAggregatesInput>
    OR?: Enumerable<ActivityScoreScalarWhereWithAggregatesInput>
    NOT?: Enumerable<ActivityScoreScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    score?: FloatWithAggregatesFilter | number
  }

  export type UsersInteractionsWhereInput = {
    AND?: Enumerable<UsersInteractionsWhereInput>
    OR?: Enumerable<UsersInteractionsWhereInput>
    NOT?: Enumerable<UsersInteractionsWhereInput>
    id?: StringFilter | string
    ownerId?: StringFilter | string
    userId?: StringFilter | string
    postLikes?: IntFilter | number
    commentsReply?: IntFilter | number
    commentsLikes?: IntFilter | number
    shares?: IntFilter | number
    messages?: IntFilter | number
    mentions?: IntFilter | number
    reviewedItems?: IntFilter | number
    profileVisits?: IntFilter | number
    postSaved?: IntFilter | number
    interactionScore?: FloatFilter | number
    createdAt?: DateTimeFilter | Date | string
    updatedAt?: DateTimeFilter | Date | string
  }

  export type UsersInteractionsOrderByWithRelationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    userId?: SortOrder
    postLikes?: SortOrder
    commentsReply?: SortOrder
    commentsLikes?: SortOrder
    shares?: SortOrder
    messages?: SortOrder
    mentions?: SortOrder
    reviewedItems?: SortOrder
    profileVisits?: SortOrder
    postSaved?: SortOrder
    interactionScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersInteractionsWhereUniqueInput = {
    id?: string
    ownerId_userId?: UsersInteractionsOwnerIdUserIdCompoundUniqueInput
  }

  export type UsersInteractionsOrderByWithAggregationInput = {
    id?: SortOrder
    ownerId?: SortOrder
    userId?: SortOrder
    postLikes?: SortOrder
    commentsReply?: SortOrder
    commentsLikes?: SortOrder
    shares?: SortOrder
    messages?: SortOrder
    mentions?: SortOrder
    reviewedItems?: SortOrder
    profileVisits?: SortOrder
    postSaved?: SortOrder
    interactionScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsersInteractionsCountOrderByAggregateInput
    _avg?: UsersInteractionsAvgOrderByAggregateInput
    _max?: UsersInteractionsMaxOrderByAggregateInput
    _min?: UsersInteractionsMinOrderByAggregateInput
    _sum?: UsersInteractionsSumOrderByAggregateInput
  }

  export type UsersInteractionsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UsersInteractionsScalarWhereWithAggregatesInput>
    OR?: Enumerable<UsersInteractionsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UsersInteractionsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    ownerId?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
    postLikes?: IntWithAggregatesFilter | number
    commentsReply?: IntWithAggregatesFilter | number
    commentsLikes?: IntWithAggregatesFilter | number
    shares?: IntWithAggregatesFilter | number
    messages?: IntWithAggregatesFilter | number
    mentions?: IntWithAggregatesFilter | number
    reviewedItems?: IntWithAggregatesFilter | number
    profileVisits?: IntWithAggregatesFilter | number
    postSaved?: IntWithAggregatesFilter | number
    interactionScore?: FloatWithAggregatesFilter | number
    createdAt?: DateTimeWithAggregatesFilter | Date | string
    updatedAt?: DateTimeWithAggregatesFilter | Date | string
  }

  export type UserInterestWhereInput = {
    AND?: Enumerable<UserInterestWhereInput>
    OR?: Enumerable<UserInterestWhereInput>
    NOT?: Enumerable<UserInterestWhereInput>
    id?: StringFilter | string
    userId?: StringFilter | string
    keywords?: XOR<UserInterestKeywordCompositeListFilter, Enumerable<UserInterestKeywordObjectEqualityInput>>
  }

  export type UserInterestOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    keywords?: UserInterestKeywordOrderByCompositeAggregateInput
  }

  export type UserInterestWhereUniqueInput = {
    id?: string
    userId?: string
  }

  export type UserInterestOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    _count?: UserInterestCountOrderByAggregateInput
    _max?: UserInterestMaxOrderByAggregateInput
    _min?: UserInterestMinOrderByAggregateInput
  }

  export type UserInterestScalarWhereWithAggregatesInput = {
    AND?: Enumerable<UserInterestScalarWhereWithAggregatesInput>
    OR?: Enumerable<UserInterestScalarWhereWithAggregatesInput>
    NOT?: Enumerable<UserInterestScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    userId?: StringWithAggregatesFilter | string
  }

  export type EventWhereInput = {
    AND?: Enumerable<EventWhereInput>
    OR?: Enumerable<EventWhereInput>
    NOT?: Enumerable<EventWhereInput>
    id?: StringFilter | string
    key?: StringFilter | string
    causedById?: StringFilter | string
    causedToId?: StringNullableFilter | string | null
  }

  export type EventOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    causedById?: SortOrder
    causedToId?: SortOrder
  }

  export type EventWhereUniqueInput = {
    id?: string
  }

  export type EventOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    causedById?: SortOrder
    causedToId?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: Enumerable<EventScalarWhereWithAggregatesInput>
    OR?: Enumerable<EventScalarWhereWithAggregatesInput>
    NOT?: Enumerable<EventScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    key?: StringWithAggregatesFilter | string
    causedById?: StringWithAggregatesFilter | string
    causedToId?: StringNullableWithAggregatesFilter | string | null
  }

  export type UserActivityStatsCreateInput = {
    id: string
    activityScore?: number
    lastActive?: Date | string | null
    day_active_min?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserActivityStatsUncheckedCreateInput = {
    id: string
    activityScore?: number
    lastActive?: Date | string | null
    day_active_min?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserActivityStatsUpdateInput = {
    activityScore?: FloatFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    day_active_min?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActivityStatsUncheckedUpdateInput = {
    activityScore?: FloatFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    day_active_min?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActivityStatsCreateManyInput = {
    id: string
    activityScore?: number
    lastActive?: Date | string | null
    day_active_min?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserActivityStatsUpdateManyMutationInput = {
    activityScore?: FloatFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    day_active_min?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserActivityStatsUncheckedUpdateManyInput = {
    activityScore?: FloatFieldUpdateOperationsInput | number
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    day_active_min?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityScoreCreateInput = {
    id?: string
    score: number
  }

  export type ActivityScoreUncheckedCreateInput = {
    id?: string
    score: number
  }

  export type ActivityScoreUpdateInput = {
    score?: FloatFieldUpdateOperationsInput | number
  }

  export type ActivityScoreUncheckedUpdateInput = {
    score?: FloatFieldUpdateOperationsInput | number
  }

  export type ActivityScoreCreateManyInput = {
    id?: string
    score: number
  }

  export type ActivityScoreUpdateManyMutationInput = {
    score?: FloatFieldUpdateOperationsInput | number
  }

  export type ActivityScoreUncheckedUpdateManyInput = {
    score?: FloatFieldUpdateOperationsInput | number
  }

  export type UsersInteractionsCreateInput = {
    id?: string
    ownerId: string
    userId: string
    postLikes?: number
    commentsReply?: number
    commentsLikes?: number
    shares?: number
    messages?: number
    mentions?: number
    reviewedItems?: number
    profileVisits?: number
    postSaved?: number
    interactionScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsersInteractionsUncheckedCreateInput = {
    id?: string
    ownerId: string
    userId: string
    postLikes?: number
    commentsReply?: number
    commentsLikes?: number
    shares?: number
    messages?: number
    mentions?: number
    reviewedItems?: number
    profileVisits?: number
    postSaved?: number
    interactionScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsersInteractionsUpdateInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    postLikes?: IntFieldUpdateOperationsInput | number
    commentsReply?: IntFieldUpdateOperationsInput | number
    commentsLikes?: IntFieldUpdateOperationsInput | number
    shares?: IntFieldUpdateOperationsInput | number
    messages?: IntFieldUpdateOperationsInput | number
    mentions?: IntFieldUpdateOperationsInput | number
    reviewedItems?: IntFieldUpdateOperationsInput | number
    profileVisits?: IntFieldUpdateOperationsInput | number
    postSaved?: IntFieldUpdateOperationsInput | number
    interactionScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersInteractionsUncheckedUpdateInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    postLikes?: IntFieldUpdateOperationsInput | number
    commentsReply?: IntFieldUpdateOperationsInput | number
    commentsLikes?: IntFieldUpdateOperationsInput | number
    shares?: IntFieldUpdateOperationsInput | number
    messages?: IntFieldUpdateOperationsInput | number
    mentions?: IntFieldUpdateOperationsInput | number
    reviewedItems?: IntFieldUpdateOperationsInput | number
    profileVisits?: IntFieldUpdateOperationsInput | number
    postSaved?: IntFieldUpdateOperationsInput | number
    interactionScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersInteractionsCreateManyInput = {
    id?: string
    ownerId: string
    userId: string
    postLikes?: number
    commentsReply?: number
    commentsLikes?: number
    shares?: number
    messages?: number
    mentions?: number
    reviewedItems?: number
    profileVisits?: number
    postSaved?: number
    interactionScore?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsersInteractionsUpdateManyMutationInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    postLikes?: IntFieldUpdateOperationsInput | number
    commentsReply?: IntFieldUpdateOperationsInput | number
    commentsLikes?: IntFieldUpdateOperationsInput | number
    shares?: IntFieldUpdateOperationsInput | number
    messages?: IntFieldUpdateOperationsInput | number
    mentions?: IntFieldUpdateOperationsInput | number
    reviewedItems?: IntFieldUpdateOperationsInput | number
    profileVisits?: IntFieldUpdateOperationsInput | number
    postSaved?: IntFieldUpdateOperationsInput | number
    interactionScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsersInteractionsUncheckedUpdateManyInput = {
    ownerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    postLikes?: IntFieldUpdateOperationsInput | number
    commentsReply?: IntFieldUpdateOperationsInput | number
    commentsLikes?: IntFieldUpdateOperationsInput | number
    shares?: IntFieldUpdateOperationsInput | number
    messages?: IntFieldUpdateOperationsInput | number
    mentions?: IntFieldUpdateOperationsInput | number
    reviewedItems?: IntFieldUpdateOperationsInput | number
    profileVisits?: IntFieldUpdateOperationsInput | number
    postSaved?: IntFieldUpdateOperationsInput | number
    interactionScore?: FloatFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserInterestCreateInput = {
    id?: string
    userId: string
    keywords?: XOR<UserInterestKeywordListCreateEnvelopeInput, Enumerable<UserInterestKeywordCreateInput>>
  }

  export type UserInterestUncheckedCreateInput = {
    id?: string
    userId: string
    keywords?: XOR<UserInterestKeywordListCreateEnvelopeInput, Enumerable<UserInterestKeywordCreateInput>>
  }

  export type UserInterestUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    keywords?: XOR<UserInterestKeywordListUpdateEnvelopeInput, Enumerable<UserInterestKeywordCreateInput>>
  }

  export type UserInterestUncheckedUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    keywords?: XOR<UserInterestKeywordListUpdateEnvelopeInput, Enumerable<UserInterestKeywordCreateInput>>
  }

  export type UserInterestCreateManyInput = {
    id?: string
    userId: string
    keywords?: XOR<UserInterestKeywordListCreateEnvelopeInput, Enumerable<UserInterestKeywordCreateInput>>
  }

  export type UserInterestUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    keywords?: XOR<UserInterestKeywordListUpdateEnvelopeInput, Enumerable<UserInterestKeywordCreateInput>>
  }

  export type UserInterestUncheckedUpdateManyInput = {
    userId?: StringFieldUpdateOperationsInput | string
    keywords?: XOR<UserInterestKeywordListUpdateEnvelopeInput, Enumerable<UserInterestKeywordCreateInput>>
  }

  export type EventCreateInput = {
    id?: string
    key: string
    causedById: string
    causedToId?: string | null
  }

  export type EventUncheckedCreateInput = {
    id?: string
    key: string
    causedById: string
    causedToId?: string | null
  }

  export type EventUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    causedById?: StringFieldUpdateOperationsInput | string
    causedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    causedById?: StringFieldUpdateOperationsInput | string
    causedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventCreateManyInput = {
    id?: string
    key: string
    causedById: string
    causedToId?: string | null
  }

  export type EventUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    causedById?: StringFieldUpdateOperationsInput | string
    causedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type EventUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    causedById?: StringFieldUpdateOperationsInput | string
    causedToId?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type FloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
    isSet?: boolean
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type UserActivityStatsCountOrderByAggregateInput = {
    id?: SortOrder
    activityScore?: SortOrder
    lastActive?: SortOrder
    day_active_min?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserActivityStatsAvgOrderByAggregateInput = {
    activityScore?: SortOrder
    day_active_min?: SortOrder
  }

  export type UserActivityStatsMaxOrderByAggregateInput = {
    id?: SortOrder
    activityScore?: SortOrder
    lastActive?: SortOrder
    day_active_min?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserActivityStatsMinOrderByAggregateInput = {
    id?: SortOrder
    activityScore?: SortOrder
    lastActive?: SortOrder
    day_active_min?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserActivityStatsSumOrderByAggregateInput = {
    activityScore?: SortOrder
    day_active_min?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type FloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
    isSet?: boolean
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type ActivityScoreCountOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
  }

  export type ActivityScoreAvgOrderByAggregateInput = {
    score?: SortOrder
  }

  export type ActivityScoreMaxOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
  }

  export type ActivityScoreMinOrderByAggregateInput = {
    id?: SortOrder
    score?: SortOrder
  }

  export type ActivityScoreSumOrderByAggregateInput = {
    score?: SortOrder
  }

  export type UsersInteractionsOwnerIdUserIdCompoundUniqueInput = {
    ownerId: string
    userId: string
  }

  export type UsersInteractionsCountOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    userId?: SortOrder
    postLikes?: SortOrder
    commentsReply?: SortOrder
    commentsLikes?: SortOrder
    shares?: SortOrder
    messages?: SortOrder
    mentions?: SortOrder
    reviewedItems?: SortOrder
    profileVisits?: SortOrder
    postSaved?: SortOrder
    interactionScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersInteractionsAvgOrderByAggregateInput = {
    postLikes?: SortOrder
    commentsReply?: SortOrder
    commentsLikes?: SortOrder
    shares?: SortOrder
    messages?: SortOrder
    mentions?: SortOrder
    reviewedItems?: SortOrder
    profileVisits?: SortOrder
    postSaved?: SortOrder
    interactionScore?: SortOrder
  }

  export type UsersInteractionsMaxOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    userId?: SortOrder
    postLikes?: SortOrder
    commentsReply?: SortOrder
    commentsLikes?: SortOrder
    shares?: SortOrder
    messages?: SortOrder
    mentions?: SortOrder
    reviewedItems?: SortOrder
    profileVisits?: SortOrder
    postSaved?: SortOrder
    interactionScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersInteractionsMinOrderByAggregateInput = {
    id?: SortOrder
    ownerId?: SortOrder
    userId?: SortOrder
    postLikes?: SortOrder
    commentsReply?: SortOrder
    commentsLikes?: SortOrder
    shares?: SortOrder
    messages?: SortOrder
    mentions?: SortOrder
    reviewedItems?: SortOrder
    profileVisits?: SortOrder
    postSaved?: SortOrder
    interactionScore?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsersInteractionsSumOrderByAggregateInput = {
    postLikes?: SortOrder
    commentsReply?: SortOrder
    commentsLikes?: SortOrder
    shares?: SortOrder
    messages?: SortOrder
    mentions?: SortOrder
    reviewedItems?: SortOrder
    profileVisits?: SortOrder
    postSaved?: SortOrder
    interactionScore?: SortOrder
  }

  export type UserInterestKeywordCompositeListFilter = {
    equals?: Enumerable<UserInterestKeywordObjectEqualityInput>
    every?: UserInterestKeywordWhereInput
    some?: UserInterestKeywordWhereInput
    none?: UserInterestKeywordWhereInput
    isEmpty?: boolean
    isSet?: boolean
  }

  export type UserInterestKeywordObjectEqualityInput = {
    value: string
    score: number
  }

  export type UserInterestKeywordOrderByCompositeAggregateInput = {
    _count?: SortOrder
  }

  export type UserInterestCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserInterestMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type UserInterestMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  export type EventCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    causedById?: SortOrder
    causedToId?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    causedById?: SortOrder
    causedToId?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    causedById?: SortOrder
    causedToId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
    unset?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type UserInterestKeywordListCreateEnvelopeInput = {
    set?: Enumerable<UserInterestKeywordCreateInput>
  }

  export type UserInterestKeywordCreateInput = {
    value: string
    score: number
  }

  export type UserInterestKeywordListUpdateEnvelopeInput = {
    set?: Enumerable<UserInterestKeywordCreateInput>
    push?: Enumerable<UserInterestKeywordCreateInput>
    updateMany?: UserInterestKeywordUpdateManyInput
    deleteMany?: UserInterestKeywordDeleteManyInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
    unset?: boolean
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
    isSet?: boolean
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedFloatWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedFloatFilter
    _min?: NestedFloatFilter
    _max?: NestedFloatFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
    isSet?: boolean
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
    isSet?: boolean
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type UserInterestKeywordWhereInput = {
    AND?: Enumerable<UserInterestKeywordWhereInput>
    OR?: Enumerable<UserInterestKeywordWhereInput>
    NOT?: Enumerable<UserInterestKeywordWhereInput>
    value?: StringFilter | string
    score?: FloatFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
    isSet?: boolean
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
    isSet?: boolean
  }

  export type UserInterestKeywordUpdateManyInput = {
    where: UserInterestKeywordWhereInput
    data: UserInterestKeywordUpdateInput
  }

  export type UserInterestKeywordDeleteManyInput = {
    where: UserInterestKeywordWhereInput
  }

  export type UserInterestKeywordUpdateInput = {
    value?: StringFieldUpdateOperationsInput | string
    score?: FloatFieldUpdateOperationsInput | number
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}