import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConstRoutes } from "src/app/shared/constants/const-routes.constant";
import { QueryBuilder } from "src/app/shared/helpers/query-builder/query-builder";
import { PageQuery } from "src/app/shared/models/common/page/page-query.models";
import { PageResponse } from "src/app/shared/models/common/page/page-response.models";
import { CreateProposalModel } from "src/app/shared/models/view-models/proposal/create-proposal.model";
import { ProposalFilterModel } from "src/app/shared/models/view-models/proposal/filter-proposal.model";
import { ProposalModel } from "src/app/shared/models/view-models/proposal/proposal.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: "root"
})
export class ProposalService {
    constructor(private http: HttpClient) {}

    public create(model: CreateProposalModel): Observable<ProposalModel> {
        return this.http.post<ProposalModel>(
            `${environment.apiUrl}${ConstRoutes.CREATE_PROPOSAL}`,
            model
        );
    }

    public getFiltered(
        pagination: PageQuery,
        filter: ProposalFilterModel
    ): Observable<PageResponse> {
        const params = QueryBuilder.add(filter).add(pagination).build();
        return this.http.get<PageResponse>(
            `${environment.apiUrl}${ConstRoutes.GET_FILTERED_PROPOSALS}`,
            { params: params }
        );
    }

    public delete(id: string): Observable<void> {
        return this.http.get<void>(
            `${environment.apiUrl}${ConstRoutes.DELETE_PROPOSAL}`,
            { params: { id } }
        );
    }

    public getById(id: string): Observable<ProposalModel> {
        return this.http.get<ProposalModel>(
            `${environment.apiUrl}${ConstRoutes.GET_BY_ID_PROPOSAL}`,
            { params: { id } }
        );
    }
}
