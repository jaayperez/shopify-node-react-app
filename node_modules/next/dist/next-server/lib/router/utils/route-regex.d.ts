export declare function getRouteRegex(normalizedRoute: string): {
    re: RegExp;
    namedRegex?: string;
    groups: {
        [groupName: string]: {
            pos: number;
            repeat: boolean;
        };
    };
};
