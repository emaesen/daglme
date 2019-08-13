# AWS setup for secure distributed static website hosting

This is a high level overview of the steps involved in setting up hosting of a secured distributed static public website through Amazon Web Services (AWS). This overview assumes familiarity with AWS.

## Reference

[AWS website hosting walkthrough](https://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html) is a good starting point. It doesn't address the more advanced topics of setting up an SSL security certificate or the CloudFront distribution that are outlined below. Detailed information about those topics can be found elsewhere on the AWS documentation site.

## Register a domain with Route 53

Use [AWS Route 53](https://console.aws.amazon.com/route53/home?region=us-east-1) to register your desired domain.

## Create and Configure S3 content Buckets

Use [AWS S3](https://s3.console.aws.amazon.com/s3/home?region=us-east-1) Buckets to store website files.

"To support requests from both the root domain such as example.com and subdomain such as www.example.com, you create two buckets. One bucket contains the content. You configure the other bucket to redirect requests." A third bucket can be used to store web traffic logs.

First create a log bucket
`logs.{mydomainname}`

Next a bucker for the content
`{mydomainname}`

And third a bucket for the www subdomain
`www.{mydomainname}`

In the content bucket:

- upload index.html document
- upload error.html document

Set public read permissions on content bucket.

Set public read permissions on www subdomain bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::{mydomainname}/*"
    }
  ]
}
```

Configure content bucket Static Web Hosting to "Use this bucket to host a website"

Configure www subdomain bucket Static Web Hosting to "Redirect requests" to the content bucket.

### For SPA: redirect all page requests to main index page

Configure content bucket Static Web Hosting to set "Index document" to "index.html",
as well as:
Configure content bucket Static Web Hosting to set "Error document" to "index.html"
(This works fine for regular browser users but pages return a 404 code, which is not good for SEO purposes - this is fixed in the CloudFront configuration)

## Create SSL Certificate

Open [AWS ACM](https://console.aws.amazon.com/acm/home?region=us-east-1#/).
Follow instructions (fairly straightforward)

## Create CloudFront distribution

(wait for the SSL certificate to be issued - takes only a few minutes)

Open [AWS Cloudfront](https://console.aws.amazon.com/cloudfront/home?region=us-east-1) to create a new distribution.

Use defaults except:

- "Origin Domain Name" => click in box and select existing S3 content bucket.
- "Viewer Protocol Policy" => select "Redirect HTTP to HTTPS"
- "Compress Objects Automatically" => Yes
- "Alternate Domain Names (CNAMEs)" => {mydomainname} www.{mydomainname}
- "SSL Certificate" => check "Custom SSL Certificate"
- "Custom SSL Certificate" => click in box and select SSL certificate previously created
- "Default Root Object" => Type "index.html" (without the quotes)
- "Logging" => check "On"
- "Bucket for Logs" => click in box and select existing S3 log bucket.
- "Log Prefix" => type "cdn/" (without the quotes)

### For SPA SEO: replace 404 response code with 200 code

Under Error Pages tab, click Create Custom Error Response
HTTP Error Code: 404 Not Found
Customize Error Response: Yes
Response Page Path: /index.html
HTTP Response Code: 200

## Add alias records in Route 53

(wait for the cloudfront distribution to be deployed - may take 20-30 minutes)

Open [AWS Route 53](https://console.aws.amazon.com/route53/home?region=us-east-1) to edit the DNS records of your registered domain.

At this point there should be four records:

- One NS (nameserver) record
- One SOA (start of authority) record
- One or more CNAME (canonical name) records for the SSL certificates (number depends on your choices during the SSL creation)

Create a Record Set.

Accept defaults except:

- "Name" => leave empty (is main domain)
- "Alias" => select "yes"
- "Alias target" => type the name of the cloudfront distribution created previously (it may also already be available as a selectable default value).

Create another Record Set same as previous one except:

- "Name" => type "www" (without the double quotes)

## Test in a browser

Type the domain name with and without "www" subdomain. Both cases should redirect to the secure `https` version of your new site.
