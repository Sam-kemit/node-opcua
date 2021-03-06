/**
 * @module node-opcua-address-space
 */
import { assert } from "node-opcua-assert";
import * as _ from "underscore";

import { Int64 } from "node-opcua-basic-types";
import { EnumValueType } from "node-opcua-common";
import { coerceLocalizedText } from "node-opcua-data-model";

export function coerceEnumValues(enumValues: any): EnumValueType[] {

    if (_.isArray(enumValues)) {

        //
        return _.map(enumValues, (en: any) => {
            assert(en.hasOwnProperty("value"));
            assert(en.hasOwnProperty("displayName"));
            return new EnumValueType({
                displayName: coerceLocalizedText(en.displayName),
                value: en.value,
            });
        });

    } else {
        return coerceEnumValues(_.map(enumValues, (value: Int64, key)  => {

            return new EnumValueType({
                description: coerceLocalizedText(key),
                displayName: coerceLocalizedText(key),
                value,
            });
        }));
    }
}
