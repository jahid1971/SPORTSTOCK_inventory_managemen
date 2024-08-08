import { Model, QueryOptions, FilterQuery, SortOrder } from "mongoose";

export type TQueryObject<T> = {
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: string;
    page?: number;
    limit?: number;
    [key: string]: any;
} & Partial<T>;

type TGetAllItemsOptions<T> = {
    mode?: "find" | "aggregate";
    searchableFields?: (keyof T)[] | string[];
    filterableFields?: (keyof T | string)[];
    andConditions?: FilterQuery<T>[];
    isDeletedCondition?: boolean;
    select?: Partial<Record<keyof T, 1 | 0>>;
    populate?: any;
    extraSearchConditions?: FilterQuery<T>[];
    orderBy?: Record<string, SortOrder>;
    aggregationPipeline?: any[];
};

const getAllItems = async <T>(
    Model: Model<T>,
    query: Partial<Record<keyof T, unknown>> & TQueryObject<T> = {},
    options?: TGetAllItemsOptions<T>
): Promise<{
    data: T[];
    meta: { page: number; limit: number; total: number; totalPages: number };
}> => {
    const sortBy = (query?.sortBy as string) || "createdAt";
    const sortOrder = query?.sortOrder === "asc" ? 1 : -1;
    const page = Number(query?.page) || 1;
    const limit = Number(query?.limit) || 10;

    const andConditions: FilterQuery<T>[] = [];

    if (options?.andConditions) andConditions.push(...options.andConditions);

    if (!(options?.isDeletedCondition === false))
        andConditions.push({ isDeleted: { $ne: true } } as FilterQuery<T>);

    if (
        query?.searchTerm &&
        typeof query.searchTerm === "string" &&
        query?.searchTerm.trim() !== ""
    ) {
        const orConditions = (options?.searchableFields ?? []).map(
            (field) =>
                ({
                    [field]: { $regex: query.searchTerm, $options: "i" },
                }) as FilterQuery<T>
        );

        if (options?.extraSearchConditions) {
            orConditions.push(...options.extraSearchConditions);
        }

        if (orConditions.length > 0) {
            andConditions.push({ $or: orConditions });
        }
    }

    const filterObject = options?.filterableFields?.reduce((acc, field) => {
        if (query[field] !== undefined) acc[field] = query[field];
        return acc;
    }, {} as FilterQuery<T>);

    if (filterObject && Object.keys(filterObject).length > 0) {
        Object.keys(filterObject).forEach((key) => {
            const fieldValue = (filterObject as any)[key];

            if (Array.isArray(fieldValue)) {
                andConditions.push({
                    [key]: { $in: fieldValue },
                } as FilterQuery<T>);
            } else {
                andConditions.push({ [key]: fieldValue } as FilterQuery<T>);
            }
        });
    }

    const whereConditions: FilterQuery<T> | undefined =
        andConditions.length > 0 ? { $and: andConditions } : undefined;

    // console.log("where condition ----");
    // console.dir(whereConditions, { depth: null });

    if (options?.mode !== "aggregate") {
        // FIND MODE
        const queryOptions: QueryOptions<T> = {
            skip: (page - 1) * limit,
            limit: limit,
            sort: options?.orderBy || { [sortBy]: sortOrder },
            ...(options?.select && { projection: options.select }),
            ...(options?.populate && { populate: options?.populate }),
        };

        const result = await Model.find(
            whereConditions || {},
            null,
            queryOptions
        ).exec();
        const total = await Model.countDocuments(whereConditions).exec();

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    } else {
        // AGGREGATE MODE
        const basePipeline = [...(options.aggregationPipeline || [])];

        // if (whereConditions) {
        //     basePipeline.push({ $match: whereConditions });
        // }

        // const basePipeline = [...(options.aggregationPipeline || [])];

        if (whereConditions) {
            // console.log(whereConditions ,"where condition ----------------")

            const projectIndex = basePipeline.findIndex(
                (stage) => "$project" in stage
            );

            if (projectIndex !== -1) {
                basePipeline.splice(projectIndex, 0, {
                    $match: whereConditions,
                });
            } else {
                basePipeline.push({ $match: whereConditions });
            }
        }

        // console.log(basePipeline ,"base pipeleine    ----------------")

        const aggregationPipeline = [
            ...basePipeline,
            { $sort: options?.orderBy || { [sortBy]: sortOrder } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ];

        // console.log(aggregationPipeline, "aggregationPipeline");
        // console.dir(aggregationPipeline, { depth: null });

        const result = await Model.aggregate(aggregationPipeline).exec();

        const countPipeline = [...basePipeline, { $count: "total" }];

        const totalResult = await Model.aggregate(countPipeline).exec();
        const total = totalResult[0]?.total || 0;

        return {
            data: result,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
};

export default getAllItems;
