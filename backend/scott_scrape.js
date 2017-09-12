var casper = require('casper').create({
    pageSettings: {
        loadImages:  false,
        loadPlugins: false
    }
});

casper.start();

casper.thenOpen('http://athensga.chambermaster.com/list', function () {
    this.echo(this.getTitle());
    if (this.exists('div#mn-alphanumeric')) {
        //this.echo('success');
        var alphanumericLinks = this.getElementsAttribute('div#mn-alphanumeric > a', 'href');
        //this.echo('alphanumeric links');
       // this.echo(alphanumericLinks);

        for(var i = 22; i < alphanumericLinks.length; i++){

            casper.thenOpen(alphanumericLinks[i], function () {
                this.echo(this.getTitle());

                if (this.exists('div.mn-title > a')) {
                    //this.echo(this.getElementsAttribute('div.mn-title > a', 'href'));
                    var businessDirectoryLinks = this.getElementsAttribute('div.mn-title > a', 'href');
                    for(var i = 0; i < businessDirectoryLinks.length; i++){

                        casper.thenOpen(businessDirectoryLinks[i], function () {
                            //this.echo(this.getHTML('h1[itemprop="name"]'));
                            //var businessName = this.getHTML('h1[itemprop="name"]');
			    if (this.exists('h1[itemprop="name"]')) {
                                var businessName = this.getHTML('h1[itemprop="name"]')
                            }else{
                                var businessName = 'No Name Listed';
                            }
                            if (this.exists('a[itemprop="url"]')) {
                                var businessLink = this.getElementAttribute('a[itemprop="url"]', 'href')
                            }else{
                                var businessLink = 'No Website Listed';
                            }
                            if (this.exists('div[itemprop="streetAddress"]')) {
                                var streetAddress = this.getHTML('div[itemprop="streetAddress"]')
                            }else{
                                var streetAddress = 'No Street Address Listed';
                            }
                            if (this.exists('span.mn-cityspan')) {
                                var city = this.getHTML('span.mn-cityspan')
                            }else{
                                var city = 'No City Listed';
                            }
                            if (this.exists('span.mn-stspan')) {
                                var state = this.getHTML('span.mn-stspan')
                            }else{
                                var city = 'No State Listed';
                            }
                            if (this.exists('span.mn-zipspan')) {
                                var zipCode = this.getHTML('span.mn-zipspan')
                            }else{
                                var zipCode = 'No Zip Code Listed';
                            }
                            if (this.exists('ul.mn-member-cats > li')) {
                                var category = this.getHTML('ul.mn-member-cats > li')
                            }else{
                                var category = 'No Category Listed';
                            }
                            if (this.exists('div.mn-member-phone1')) {
                                var phone = this.getHTML('div.mn-member-phone1')
                            }else{
                                var phone = 'No Phone Number Listed';
                            }
                            //console.log(businessName);
                            //console.log(category);
                            //console.log(businessLink);
                            //console.log(streetAddress);
                            //console.log(city);
                            //console.log(state);
                            //console.log(zipCode);
                            //console.log(phone);

                            casper.thenOpen('http://localhost:4060/postBusinessData', {

                                method: 'POST',
                                data: {
                                    'name': businessName,
                                    'category': category,
                                    'website': businessLink,
                                    'streetAddress': streetAddress,
                                    'city': city,
                                    'state': state,
                                    'zipCode': zipCode,
                                    'phone': phone
                                }
                            });


			    this.clearCache();
			    this.page.close();
                            this.page = require('webpage').create();
                        });


                    }





                }else{
                    this.echo('Business Link Not Found')
                }
                this.clearCache();
                this.page.close();
                this.page = require('webpage').create();
            })
        }
    }else{
        this.echo('failure')
    }

});

casper.run();
