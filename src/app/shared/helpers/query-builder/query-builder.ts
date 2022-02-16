import { HttpParams } from "@angular/common/http";

export class QueryBuilder {
    private params: HttpParams;

    constructor() {
        this.params = new HttpParams();
    }

    static add(param: any): QueryBuilder {
        var builder = new QueryBuilder();
        builder.add(param);
        return builder;
    }

    add(param: any): QueryBuilder {

        if (param) {
            for (const [key, value] of Object.entries(param)) {
                if (value) {
                    this.params = this.params.append(key, value.toString());
                }
            }
        }
        return this;
    }

    build(): HttpParams {
        return this.params;
    }
}
