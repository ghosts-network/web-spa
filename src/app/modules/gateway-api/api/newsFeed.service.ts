/**
 * GhostNetwork/Gateway API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

import { AddNewsFeedComment } from '../model/models';
import { AddNewsFeedReaction } from '../model/models';
import { CreateNewsFeedPublication } from '../model/models';
import { NewsFeedPublication } from '../model/models';
import { ProblemDetails } from '../model/models';
import { PublicationComment } from '../model/models';
import { ReactionShort } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class NewsFeedService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key,
                        (value as Date).toISOString().substr(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * @param commentId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedCommentsCommentIdDelete(commentId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any>;
    public newsFeedCommentsCommentIdDelete(commentId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<any>>;
    public newsFeedCommentsCommentIdDelete(commentId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<any>>;
    public newsFeedCommentsCommentIdDelete(commentId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {
        if (commentId === null || commentId === undefined) {
            throw new Error('Required parameter commentId was null or undefined when calling newsFeedCommentsCommentIdDelete.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/NewsFeed/comments/${encodeURIComponent(String(commentId))}`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param skip
     * @param take
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedGet(skip?: number, take?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<Array<NewsFeedPublication>>;
    public newsFeedGet(skip?: number, take?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<Array<NewsFeedPublication>>>;
    public newsFeedGet(skip?: number, take?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<Array<NewsFeedPublication>>>;
    public newsFeedGet(skip?: number, take?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (skip !== undefined && skip !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>skip, 'skip');
        }
        if (take !== undefined && take !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>take, 'take');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<Array<NewsFeedPublication>>(`${this.configuration.basePath}/NewsFeed`,
            {
                params: queryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param createNewsFeedPublication
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedPost(createNewsFeedPublication?: CreateNewsFeedPublication, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<NewsFeedPublication>;
    public newsFeedPost(createNewsFeedPublication?: CreateNewsFeedPublication, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<NewsFeedPublication>>;
    public newsFeedPost(createNewsFeedPublication?: CreateNewsFeedPublication, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<NewsFeedPublication>>;
    public newsFeedPost(createNewsFeedPublication?: CreateNewsFeedPublication, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.post<NewsFeedPublication>(`${this.configuration.basePath}/NewsFeed`,
            createNewsFeedPublication,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param publicationId
     * @param skip
     * @param take
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedPublicationIdCommentsGet(publicationId: string, skip?: number, take?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
    public newsFeedPublicationIdCommentsGet(publicationId: string, skip?: number, take?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
    public newsFeedPublicationIdCommentsGet(publicationId: string, skip?: number, take?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
    public newsFeedPublicationIdCommentsGet(publicationId: string, skip?: number, take?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
        if (publicationId === null || publicationId === undefined) {
            throw new Error('Required parameter publicationId was null or undefined when calling newsFeedPublicationIdCommentsGet.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (skip !== undefined && skip !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>skip, 'skip');
        }
        if (take !== undefined && take !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>take, 'take');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<any>(`${this.configuration.basePath}/NewsFeed/${encodeURIComponent(String(publicationId))}/comments`,
            {
                params: queryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param publicationId
     * @param addNewsFeedComment
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedPublicationIdCommentsPost(publicationId: string, addNewsFeedComment?: AddNewsFeedComment, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<PublicationComment>;
    public newsFeedPublicationIdCommentsPost(publicationId: string, addNewsFeedComment?: AddNewsFeedComment, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<PublicationComment>>;
    public newsFeedPublicationIdCommentsPost(publicationId: string, addNewsFeedComment?: AddNewsFeedComment, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<PublicationComment>>;
    public newsFeedPublicationIdCommentsPost(publicationId: string, addNewsFeedComment?: AddNewsFeedComment, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {
        if (publicationId === null || publicationId === undefined) {
            throw new Error('Required parameter publicationId was null or undefined when calling newsFeedPublicationIdCommentsPost.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.post<PublicationComment>(`${this.configuration.basePath}/NewsFeed/${encodeURIComponent(String(publicationId))}/comments`,
            addNewsFeedComment,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param publicationId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedPublicationIdDelete(publicationId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any>;
    public newsFeedPublicationIdDelete(publicationId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<any>>;
    public newsFeedPublicationIdDelete(publicationId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<any>>;
    public newsFeedPublicationIdDelete(publicationId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {
        if (publicationId === null || publicationId === undefined) {
            throw new Error('Required parameter publicationId was null or undefined when calling newsFeedPublicationIdDelete.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/NewsFeed/${encodeURIComponent(String(publicationId))}`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param publicationId
     * @param createNewsFeedPublication
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedPublicationIdPut(publicationId: string, createNewsFeedPublication?: CreateNewsFeedPublication, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any>;
    public newsFeedPublicationIdPut(publicationId: string, createNewsFeedPublication?: CreateNewsFeedPublication, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<any>>;
    public newsFeedPublicationIdPut(publicationId: string, createNewsFeedPublication?: CreateNewsFeedPublication, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<any>>;
    public newsFeedPublicationIdPut(publicationId: string, createNewsFeedPublication?: CreateNewsFeedPublication, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {
        if (publicationId === null || publicationId === undefined) {
            throw new Error('Required parameter publicationId was null or undefined when calling newsFeedPublicationIdPut.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.put<any>(`${this.configuration.basePath}/NewsFeed/${encodeURIComponent(String(publicationId))}`,
            createNewsFeedPublication,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param publicationId
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedPublicationIdReactionDelete(publicationId: string, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<any>;
    public newsFeedPublicationIdReactionDelete(publicationId: string, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpResponse<any>>;
    public newsFeedPublicationIdReactionDelete(publicationId: string, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: undefined}): Observable<HttpEvent<any>>;
    public newsFeedPublicationIdReactionDelete(publicationId: string, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: undefined}): Observable<any> {
        if (publicationId === null || publicationId === undefined) {
            throw new Error('Required parameter publicationId was null or undefined when calling newsFeedPublicationIdReactionDelete.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.delete<any>(`${this.configuration.basePath}/NewsFeed/${encodeURIComponent(String(publicationId))}/reaction`,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param publicationId
     * @param addNewsFeedReaction
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedPublicationIdReactionPost(publicationId: string, addNewsFeedReaction?: AddNewsFeedReaction, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<ReactionShort>;
    public newsFeedPublicationIdReactionPost(publicationId: string, addNewsFeedReaction?: AddNewsFeedReaction, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<ReactionShort>>;
    public newsFeedPublicationIdReactionPost(publicationId: string, addNewsFeedReaction?: AddNewsFeedReaction, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<ReactionShort>>;
    public newsFeedPublicationIdReactionPost(publicationId: string, addNewsFeedReaction?: AddNewsFeedReaction, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {
        if (publicationId === null || publicationId === undefined) {
            throw new Error('Required parameter publicationId was null or undefined when calling newsFeedPublicationIdReactionPost.');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json',
            'text/json',
            'application/_*+json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected !== undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.post<ReactionShort>(`${this.configuration.basePath}/NewsFeed/${encodeURIComponent(String(publicationId))}/reaction`,
            addNewsFeedReaction,
            {
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * @param userId
     * @param skip
     * @param take
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public newsFeedUsersUserIdGet(userId: string, skip?: number, take?: number, observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<Array<NewsFeedPublication>>;
    public newsFeedUsersUserIdGet(userId: string, skip?: number, take?: number, observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpResponse<Array<NewsFeedPublication>>>;
    public newsFeedUsersUserIdGet(userId: string, skip?: number, take?: number, observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<HttpEvent<Array<NewsFeedPublication>>>;
    public newsFeedUsersUserIdGet(userId: string, skip?: number, take?: number, observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json'}): Observable<any> {
        if (userId === null || userId === undefined) {
            throw new Error('Required parameter userId was null or undefined when calling newsFeedUsersUserIdGet.');
        }

        let queryParameters = new HttpParams({encoder: this.encoder});
        if (skip !== undefined && skip !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>skip, 'skip');
        }
        if (take !== undefined && take !== null) {
          queryParameters = this.addToHttpParams(queryParameters,
            <any>take, 'take');
        }

        let headers = this.defaultHeaders;

        let credential: string | undefined;
        // authentication (oauth2) required
        credential = this.configuration.lookupCredential('oauth2');
        if (credential) {
            headers = headers.set('Authorization', 'Bearer ' + credential);
        }

        let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (httpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'text/plain',
                'application/json',
                'text/json'
            ];
            httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (httpHeaderAcceptSelected !== undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }


        let responseType_: 'text' | 'json' = 'json';
        if(httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
            responseType_ = 'text';
        }

        return this.httpClient.get<Array<NewsFeedPublication>>(`${this.configuration.basePath}/NewsFeed/users/${encodeURIComponent(String(userId))}`,
            {
                params: queryParameters,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
